import { useMemo } from "react";
import { useTransactionStore } from "@/stores/transaction-store";
import type { Transaction } from "@/types/transaction";

const normalizeTransaction = (tx: Transaction): Transaction => ({
  ...tx,
  timestamp:
    typeof tx.timestamp === "string" ? new Date(tx.timestamp) : tx.timestamp,
});

export function useTransactions(walletAddress: string | null) {
  const transactions = useTransactionStore((state) => state.transactions);

  const userTransactions = useMemo(() => {
    if (!walletAddress) return [];
    return transactions
      .map(normalizeTransaction)
      .filter((tx) => tx.from === walletAddress || tx.to === walletAddress);
  }, [walletAddress, transactions]);

  const normalizedAllTransactions = useMemo(() => {
    return transactions.map(normalizeTransaction);
  }, [transactions]);

  return {
    transactions: userTransactions,
    allTransactions: normalizedAllTransactions,
  };
}
