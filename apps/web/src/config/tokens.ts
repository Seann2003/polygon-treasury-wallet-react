import type { TokenConfig } from "@/types/token";

export const POLYGON_MAINNET_TOKENS: TokenConfig[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  },
];

export const POLYGON_AMOY_TOKENS: TokenConfig[] = [
  {
    symbol: "USDC",
    name: "USD Coin (Testnet)",
    decimals: 6,
    address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether (Testnet)",
    decimals: 18,
    address: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
  },
];

export const ETHEREUM_SEPOLIA_TOKENS: TokenConfig[] = [
  {
    symbol: "USDC",
    name: "USD Coin (Sepolia)",
    decimals: 6,
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether (Sepolia)",
    decimals: 18,
    address: "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa",
  },
];

export const ETHEREUM_MAINNET_TOKENS: TokenConfig[] = [
  {
    symbol: "USDC",
    name: "USD Coin (Mainnet)",
    decimals: 6,
    address: "0xa0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether (Mainnet)",
    decimals: 18,
    address: "0xc02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
];

export function getTokensForChain(chainId: number): TokenConfig[] {
  switch (chainId) {
    case 137:
      return POLYGON_MAINNET_TOKENS;
    case 80002:
      return POLYGON_AMOY_TOKENS;
    case 11155111:
      return ETHEREUM_SEPOLIA_TOKENS;
    case 1:
      return ETHEREUM_MAINNET_TOKENS;
    default:
      return POLYGON_AMOY_TOKENS;
  }
}
