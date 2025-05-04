import { FlashList } from "@shopify/flash-list";
import TRANSACTIONS from "~/transactions.json";
import { TransactionItem } from "./TransactionItem";
import { RefreshControl, View } from "react-native";
import { Text } from "../ui/text";

export function TransactionList() {
  return (
    <View className='flex-1'>
      <Text className='text-lg font-bold mb-2'>Transaction History</Text>
      <View className='bg-neutral-300 dark:bg-neutral-900 rounded-lg h-full'>
        <FlashList
          data={TRANSACTIONS}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          estimatedItemSize={200}
          contentContainerStyle={{ paddingBottom: 16 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {}} />
          }
        />
      </View>
    </View>
  );
}
