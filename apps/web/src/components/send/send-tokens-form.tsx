import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { useTokenBalances } from "@/hooks/use-token-balances";
import { useSendTokens } from "@/hooks/use-send-tokens";
import { TokenSelect } from "@/components/tokens/token-select";

interface SendTokensFormProps {
  className?: string;
}

export function SendTokensForm({ className }: SendTokensFormProps) {
  const { isConnected, walletAddress, chainId } = useWallet();
  const { tokenBalances } = useTokenBalances(chainId, walletAddress);
  const { sendTokens, isSending, error } = useSendTokens();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTokenData = tokenBalances.find(
      (token) => token.address === selectedToken
    );

    if (!selectedTokenData) return;

    const result = await sendTokens(
      recipientAddress,
      sendAmount,
      selectedToken,
      selectedTokenData.symbol,
      selectedTokenData.decimals
    );

    if (result?.success) {
      setRecipientAddress("");
      setSendAmount("");
      setSelectedToken("");
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Tokens
        </CardTitle>
        <CardDescription>
          Send tokens to another wallet address
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Connect your wallet to send tokens
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TokenSelect
              tokens={tokenBalances}
              value={selectedToken}
              onChange={setSelectedToken}
            />

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.000001"
                placeholder="0.00"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Tokens
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
