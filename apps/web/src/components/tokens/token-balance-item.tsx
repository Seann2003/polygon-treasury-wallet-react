import type { TokenBalance } from "@/types/token";
import { formatBalance } from "@/lib/formatters";

interface TokenBalanceItemProps {
  token: TokenBalance;
}

export function TokenBalanceItem({ token }: TokenBalanceItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-semibold">{token.symbol}</p>
        <p className="text-sm text-muted-foreground">{token.name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          {formatBalance(token.balance, token.decimals)}
        </p>
        <p className="text-xs text-muted-foreground">{token.symbol}</p>
      </div>
    </div>
  );
}

