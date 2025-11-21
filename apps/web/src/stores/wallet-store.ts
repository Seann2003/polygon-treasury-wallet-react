import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";

interface WalletStore {
  lastConnectedAddress: string | null;
  setLastConnected: (address: string) => void;
  clearLastConnected: () => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      lastConnectedAddress: null,
      setLastConnected: (address: string) =>
        set({
          lastConnectedAddress: address,
        }),
      clearLastConnected: () =>
        set({
          lastConnectedAddress: null,
        }),
    }),
    {
      name: STORAGE_KEYS.WALLET_STORE,
    }
  )
);

