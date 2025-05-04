import { Pressable, View } from "react-native";
import { Transaction } from "~/lib/types/transaction";
import { Text } from "../ui/text";
import { useRouter } from "expo-router";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/transaction/${transaction.id}`)}>
      <View className='flex-row items-center justify-between p-4 rounded-lg shadow-md mb-2'>
        <View className='flex-col gap-2'>
          <Text className='text-lg font-bold'>{transaction.description}</Text>
          <Text className='text-sm text-gray-500'>
            {new Date(transaction.date).toLocaleDateString()}
          </Text>
        </View>
        <Text className='text-lg font-bold'>
          {transaction.type === "credit"
            ? `+RM${transaction.amount}`
            : `-RM${transaction.amount}`}
        </Text>
      </View>
    </Pressable>
  );
}
