import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWallet } from "@/hooks/use-wallet";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionItem } from "./transaction-item";
import type { Transaction } from "@/types/transaction";

interface TransactionListProps {
  className?: string;
}

export function TransactionList({ className }: TransactionListProps) {
  const { isConnected, walletAddress } = useWallet();
  const { transactions } = useTransactions(walletAddress);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          View your recent incoming and outgoing transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Connect your wallet to view transactions
          </p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions yet. Send or receive tokens to see them here.
          </p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx: Transaction) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

