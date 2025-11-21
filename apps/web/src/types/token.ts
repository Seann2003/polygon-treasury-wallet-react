export interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  address: string;
}

export interface TokenConfig {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoUrl?: string;
}

