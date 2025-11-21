export type TransactionType = "send" | "receive";

export type TransactionStatus = "pending" | "success" | "error";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  token: string;
  to?: string;
  from?: string;
  status: TransactionStatus;
  timestamp: Date;
  hash?: string;
}

