import { Eye, EyeOff, Settings } from "lucide-react-native";
import * as React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Pressable, View } from "react-native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { TransactionList } from "~/components/transactions/TransactionList";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { usePrivacy } from "~/lib/hooks/usePrivacy";
import { useColorScheme } from "~/lib/useColorScheme";
import { useEffect } from "react";
import { useAuth } from "~/lib/hooks/useAuth";
import { useRouter } from "expo-router";

const RYT_LOGO_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1A0An6cDX4cffwkZ87ihwWbQhkQ4-n7oZLQ&s";

export default function Screen() {
  const { isDarkColorScheme } = useColorScheme();
  const { isPrivate, setIsPrivate } = usePrivacy();
  const { status } = useAuth();
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
          setIsPrivate(!isPrivate);
        } else {
          console.log(result.error);
        }
      })
      .catch((error) => {
        console.error("Error during authentication", error);
      });
  };

  useEffect(() => {
    if (status === "signOut") {
      setTimeout(() => {
        router.replace("/login");
      }, 100);
    }
  }, [status, router]);

  return (
    <View className='flex-1 gap-5 p-4 bg-secondary/30'>
      {/* User Info and Button */}
      <View className='flex-row items-center justify-between'>
        <View className='flex flex-row gap-2 items-center'>
          <Avatar alt='Ryt avatar'>
            <AvatarImage source={{ uri: RYT_LOGO_AVATAR }} />
            <AvatarFallback>
              <Text>Ryt Logo</Text>
            </AvatarFallback>
          </Avatar>
          <Text className='text-lg font-bold'>Sean Tan</Text>
        </View>
      </View>

      {/* Current Balance */}
      <View className='flex items-start justify-start'>
        <Text className='text-lg font-bold'>Current Balance</Text>
        <View className='flex-row items-center gap-2'>
          {isPrivate ? (
            <Text className='text-2xl font-bold'>RM ********</Text>
          ) : (
            <Text className='text-2xl font-bold'>RM 1000.00</Text>
          )}
          <Pressable onPress={handleAuthorization}>
            {isPrivate ? (
              <EyeOff size={24} color={isDarkColorScheme ? "white" : "black"} />
            ) : (
              <Eye size={24} color={isDarkColorScheme ? "white" : "black"} />
            )}
          </Pressable>
        </View>
      </View>

      {/* Transaction List */}
      <TransactionList />
    </View>
  );
}
