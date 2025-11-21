import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownUp } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { TokenBalanceItem } from "./token-balance-item";

export function TokenBalances() {
  const { isConnected, walletAddress, chainId } = useWallet();
  const { tokenBalances, isLoading } = useTokenBalances(chainId, walletAddress);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowDownUp className="h-5 w-5" />
          Token Balances
        </CardTitle>
        <CardDescription>
          Your current token balances (auto-refreshes on wallet change)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Connect your wallet to view balances
          </p>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Loading balances...
          </p>
        ) : (
          <div className="space-y-4">
            {tokenBalances.map((token) => (
              <TokenBalanceItem key={token.address} token={token} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
