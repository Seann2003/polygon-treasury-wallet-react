import { http } from "wagmi";
import { polygon } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ETHEREUM_MAINNET, ETHEREUM_SEPOLIA, POLYGON_AMOY } from "./chains";

const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ||
  "98665fb9bb71248daf7477b2067a3d47";

export const wagmiConfig = getDefaultConfig({
  appName: "Polygon Treasury Wallet",
  projectId: projectId,
  chains: [polygon, POLYGON_AMOY, ETHEREUM_MAINNET, ETHEREUM_SEPOLIA],
  transports: {
    [polygon.id]: http(),
    [POLYGON_AMOY.id]: http(POLYGON_AMOY.rpcUrls.default.http[0]),
    [ETHEREUM_MAINNET.id]: http(ETHEREUM_MAINNET.rpcUrls.default.http[0]),
    [ETHEREUM_SEPOLIA.id]: http(ETHEREUM_SEPOLIA.rpcUrls.default.http[0]),
  },
  ssr: false,
});
