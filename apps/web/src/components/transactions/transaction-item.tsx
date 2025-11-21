import type { Transaction } from "@/types/transaction";
import { TransactionStatusIcon } from "./transaction-status";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <TransactionStatusIcon status={transaction.status} />
        <div>
          <p className="font-medium">
            {transaction.type === "send" ? "Sent" : "Received"}{" "}
            {transaction.amount} {transaction.token}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {transaction.type === "send" ?
              `To: ${transaction.to || ""}`
            : `From: ${transaction.from || ""}`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">
          {transaction.timestamp instanceof Date ?
            transaction.timestamp.toLocaleTimeString()
          : new Date(transaction.timestamp).toLocaleTimeString()}
        </p>
        <p className="text-xs text-muted-foreground capitalize">
          {transaction.status}
        </p>
      </div>
    </div>
  );
}
