import { useState, useCallback, useEffect, useRef } from "react";
import { validateSendForm } from "@/lib/validators";
import { useTransactionStore } from "@/stores/transaction-store";
import type { Transaction } from "@/types/transaction";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
] as const;

export function useSendTokens() {
  const [error, setError] = useState<string | null>(null);
  const [pendingTransactionId, setPendingTransactionId] = useState<
    string | null
  >(null);
  const { address, chainId } = useAccount();
  const { addTransaction, updateTransaction } = useTransactionStore();
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });
  const hasUpdatedTransaction = useRef(false);

  const isSending = isPending || isConfirming;

  useEffect(() => {
    if (
      isConfirmed &&
      hash &&
      pendingTransactionId &&
      !hasUpdatedTransaction.current
    ) {
      hasUpdatedTransaction.current = true;
      updateTransaction(pendingTransactionId, {
        status: "success",
        hash: hash,
      });
      toast.success("Transaction confirmed", {
        description: `Successfully sent tokens. Hash: ${hash.slice(0, 10)}...`,
      });
      setPendingTransactionId(null);
    }
  }, [isConfirmed, hash, pendingTransactionId, updateTransaction]);

  useEffect(() => {
    if (writeError && pendingTransactionId) {
      const errorMessage = writeError.message || "Transaction failed";
      setError(errorMessage);
      updateTransaction(pendingTransactionId, {
        status: "error",
      });
      toast.error("Transaction failed", {
        description: errorMessage,
      });
      setPendingTransactionId(null);
      hasUpdatedTransaction.current = false;
    }
  }, [writeError, pendingTransactionId, updateTransaction]);

  const sendTokens = useCallback(
    async (
      recipientAddress: string,
      sendAmount: string,
      selectedToken: string,
      tokenSymbol: string,
      tokenDecimals: number
    ) => {
      setError(null);
      hasUpdatedTransaction.current = false;

      if (!address) {
        setError("Wallet not connected");
        return { success: false, error: "Wallet not connected" };
      }

      if (!chainId) {
        setError("Chain not connected");
        return { success: false, error: "Chain not connected" };
      }

      const validationError = validateSendForm(
        recipientAddress,
        sendAmount,
        selectedToken
      );
      if (validationError) {
        setError(validationError);
        return { success: false, error: validationError };
      }

      try {
        const amountInWei = parseUnits(sendAmount, tokenDecimals);

        const transactionId = crypto.randomUUID();
        const pendingTransaction: Transaction = {
          id: transactionId,
          type: "send",
          amount: sendAmount,
          token: tokenSymbol,
          to: recipientAddress,
          from: address,
          status: "pending",
          timestamp: new Date(),
        };

        addTransaction(pendingTransaction);
        setPendingTransactionId(transactionId);

        writeContract(
          {
            address: selectedToken as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "transfer",
            args: [recipientAddress as `0x${string}`, amountInWei],
            chainId: chainId,
          },
          {
            onSuccess: (txHash) => {
              updateTransaction(transactionId, {
                hash: txHash,
              });
              toast.info("Transaction submitted", {
                description: `Waiting for confirmation... Hash: ${txHash.slice(0, 10)}...`,
              });
            },
            onError: (error) => {
              const errorMessage =
                error.message || "Transaction failed. Please try again.";
              setError(errorMessage);
              updateTransaction(transactionId, {
                status: "error",
              });
              setPendingTransactionId(null);
              hasUpdatedTransaction.current = false;
              toast.error("Transaction failed", {
                description: errorMessage,
              });
            },
          }
        );

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ?
            err.message
          : "Transaction failed. Please try again.";
        setError(errorMessage);
        toast.error("Transaction failed", {
          description: errorMessage,
        });
        return { success: false, error: err };
      }
    },
    [address, chainId, writeContract, addTransaction, updateTransaction]
  );

  return {
    sendTokens,
    isSending,
    error,
    hash,
    isConfirmed,
  };
}
