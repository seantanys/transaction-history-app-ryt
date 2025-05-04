import * as LocalAuthentication from "expo-local-authentication";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { signIn } from "~/lib/hooks/useAuth";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const handleAuthorization = () => {
    // use biometric authentication
    LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to view balance",
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    })
      .then((result) => {
        if (result.success) {
          signIn();
          router.replace("/");
        } else {
          console.log(result.error);
        }
      })
      .catch((error) => {
        console.error("Error during authentication", error);
      });
  };

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298", "#b0bec5"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className='flex-1 bg-secondary/30'>
        <View className='flex-1 justify-between bg-secondary/30 p-4'>
          <Text className='text-4xl font-bold text-gray-200/50'>
            Ryt Take Home Test
          </Text>
          <View className='flex-col gap-4'>
            <View className='flex-col gap-1'>
              <Text className='text-6xl font-bold'>Welcome To</Text>
              <Text className='text-6xl font-bold'>The Best</Text>
              <Text className='text-6xl font-bold'>Digital Banking</Text>
              <Text className='text-6xl font-bold'>Experience</Text>
            </View>
            <Button
              className='rounded-full bg-gray-200 p-4'
              size='lg'
              onPress={handleAuthorization}
            >
              <Text className='text-xl font-bold text-gray-800'>
                Get Started
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
