import { View } from "react-native";
import { Transaction } from "~/lib/types/transaction";
import { Text } from "../ui/text";
import { ShoppingCart } from "lucide-react-native";
import { Button } from "../ui/button";

export function TransactionDetail({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <View className='flex flex-col items-start gap-4 py-4'>
      <View className='rounded-full bg-blue-300 p-4'>
        <ShoppingCart size={32} color='black' />
      </View>
      <Text className='text-2xl font-bold'>{transaction.merchant}</Text>

      {/* Amount and Transaction Type */}
      <View>
        <Text className='text-muted-foreground text-lg'>Amount</Text>
        <Text className='text-xl font-bold'>
          {transaction.type === "credit"
            ? `+RM${transaction.amount}`
            : `-RM${transaction.amount}`}
        </Text>
      </View>

      {/* Transaction Date */}
      <View>
        <Text className='text-muted-foreground text-lg'>Transaction Date</Text>
        <Text className='text-xl font-bold'>
          {new Date(transaction.date).toLocaleDateString()}
        </Text>
      </View>

      {/* Transaction ID */}
      <View>
        <Text className='text-muted-foreground text-lg'>Transaction ID</Text>
        <Text className='text-xl font-bold'>#{transaction.id}</Text>
      </View>

      {/* Download Receipt */}
      <Button>
        <Text className='text-lg font-bold'>Download Receipt</Text>
      </Button>
    </View>
  );
}
