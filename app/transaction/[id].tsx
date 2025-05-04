import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { TransactionDetail } from "~/components/transaction-details/TransactionDetail";
import { Text } from "~/components/ui/text";
import TRANSACTIONS from "~/transactions.json";

export default function TransactionScreen() {
  const { id } = useLocalSearchParams();

  const transaction = TRANSACTIONS.find((t) => t.id === Number(id));
  if (!transaction) {
    return (
      <View className='flex-1 gap-5 p-4 bg-secondary/30'>
        <Text className='text-lg font-bold'>Transaction not found</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 gap- p-4 bg-secondary/30'>
      <TransactionDetail transaction={transaction} />
    </View>
  );
}
