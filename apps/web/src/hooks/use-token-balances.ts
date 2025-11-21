import { useState, useEffect, useCallback, useRef } from "react";
import type { TokenBalance } from "@/types/token";
import { getTokensForChain } from "@/config/tokens";
import { getBalance } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import { useTransactionStore } from "@/stores/transaction-store";

export function useTokenBalances(
  chainId: number | null,
  walletAddress: string | null
) {
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);
  const lastRefetchedTxId = useRef<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!chainId || !walletAddress) {
      setTokenBalances([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const tokenConfigs = getTokensForChain(chainId);

    try {
      const balancePromises = tokenConfigs.map(async (token) => {
        try {
          const balanceResult = await getBalance(wagmiConfig, {
            address: walletAddress as `0x${string}`,
            token: token.address as `0x${string}`,
            chainId,
          });

          return {
            ...token,
            balance: balanceResult.formatted,
          };
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);
          return {
            ...token,
            balance: "0.00",
          };
        }
      });

      const balances = await Promise.all(balancePromises);
      setTokenBalances(balances);
    } catch (error) {
      console.error("Error fetching token balances:", error);
      const balances: TokenBalance[] = tokenConfigs.map((token) => ({
        ...token,
        balance: "0.00",
      }));
      setTokenBalances(balances);
    } finally {
      setIsLoading(false);
    }
  }, [chainId, walletAddress]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  useEffect(() => {
    if (!walletAddress || !chainId) return;

    const successfulTx = transactions.find(
      (tx) =>
        (tx.from === walletAddress || tx.to === walletAddress) &&
        tx.status === "success" &&
        tx.id !== lastRefetchedTxId.current
    );

    if (successfulTx) {
      lastRefetchedTxId.current = successfulTx.id;
      const timeoutId = setTimeout(() => {
        fetchBalances();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [transactions, walletAddress, chainId, fetchBalances]);

  return {
    tokenBalances,
    isLoading,
    refetch: fetchBalances,
  };
}
