export const POLYGON_AMOY = {
  id: 80002,
  name: "Polygon Amoy",
  network: "amoy",
  nativeCurrency: {
    name: "Amoy MATIC",
    symbol: "AMAY",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://polygon-amoy-public.nodies.app"],
    },
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com",
    },
  },
};

export const ETHEREUM_MAINNET = {
  id: 1,
  name: "Ethereum Mainnet",
  network: "ethereum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://eth-mainnet.g.alchemy.com/v2/demo"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
  },
};

export const ETHEREUM_SEPOLIA = {
  id: 11155111,
  name: "Ethereum Sepolia",
  network: "sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "SEP",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://ethereum-sepolia-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
};
