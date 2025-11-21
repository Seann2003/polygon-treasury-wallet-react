import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction } from "@/types/transaction";
import { STORAGE_KEYS } from "@/lib/constants";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  clearTransactions: () => void;
  getTransactionsByAddress: (address: string) => Transaction[];
}

const normalizeTransaction = (tx: Transaction): Transaction => ({
  ...tx,
  timestamp:
    typeof tx.timestamp === "string" ? new Date(tx.timestamp) : tx.timestamp,
});

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction: Transaction) => {
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },

      updateTransaction: (id: string, updates: Partial<Transaction>) => {
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        }));
      },

      clearTransactions: () => {
        set({ transactions: [] });
      },

      getTransactionsByAddress: (address: string) => {
        const allTransactions = get().transactions;
        return allTransactions
          .map(normalizeTransaction)
          .filter((tx) => tx.from === address || tx.to === address);
      },
    }),
    {
      name: STORAGE_KEYS.TRANSACTION_STORE,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.transactions = state.transactions.map(normalizeTransaction);
        }
      },
    }
  )
);
