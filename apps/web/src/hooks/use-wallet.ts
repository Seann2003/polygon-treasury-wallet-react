import { useAccount } from "wagmi";
import { useWalletStore } from "@/stores/wallet-store";
import { useEffect } from "react";

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { setLastConnected, clearLastConnected, lastConnectedAddress } = useWalletStore();

  useEffect(() => {
    if (address && isConnected) {
      setLastConnected(address);
    } else {
      clearLastConnected();
    }
  }, [address, isConnected, setLastConnected, clearLastConnected]);

  return {
    isConnected: isConnected ?? false,
    walletAddress: address ?? "",
    chainId: chainId ?? null,
    lastConnectedAddress,
  };
}
