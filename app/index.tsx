import { Eye } from "lucide-react-native";
import * as React from "react";
import { Pressable, View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { usePrivacy } from "~/lib/hooks/usePrivacy";

export default function Screen() {
  const { isPrivate, setIsPrivate } = usePrivacy();
  return (
    <View className='flex-1 items-center gap-5 p-2 bg-secondary/30'>
      <Card className='w-full'>
        <CardContent className='p-4'>
          <View className='flex-row items-center gap-2'>
            <Text className='text-xl font-bold'>Balance</Text>
            <Text className='text-xl font-bold'>3462.00</Text>
            <Pressable
              onPress={() => {
                setIsPrivate(!isPrivate);
              }}
            >
              <Eye size={20} />
            </Pressable>
          </View>
          <Text className='text-md text-muted-foreground'>MYR</Text>
        </CardContent>
      </Card>
    </View>
  );
}
