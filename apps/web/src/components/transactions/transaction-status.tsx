import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { TransactionStatus } from "@/types/transaction";

interface TransactionStatusProps {
  status: TransactionStatus;
}

export function TransactionStatusIcon({ status }: TransactionStatusProps) {
  switch (status) {
    case "pending":
      return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
}

