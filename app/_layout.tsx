import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform, Pressable } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { LogOut } from "lucide-react-native";
import { useEffect } from "react";
import { usePrivacy } from "~/lib/hooks/usePrivacy";
import { signOut } from "~/lib/hooks/useAuth";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { setIsBiometricSupported, setBiometricType, setIsPrivate } =
    usePrivacy();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme as "light" | "dark");
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    // check biometrics capabilities
    LocalAuthentication.isEnrolledAsync().then((data) => {
      setIsBiometricSupported(data);
    });

    LocalAuthentication.supportedAuthenticationTypesAsync().then((data) => {
      if (
        data.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
      ) {
        setBiometricType("face");
      } else if (
        data.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      ) {
        setBiometricType("fingerprint");
      } else {
        setBiometricType(null);
      }
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: "Transactions",
            headerRight: () => (
              <Pressable
                onPress={() => {
                  signOut();
                  setIsPrivate(true);
                }}
              >
                <LogOut size={24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name='transaction/[id]'
          options={{
            title: "Transaction Details",
          }}
        />
        <Stack.Screen
          name='login'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
