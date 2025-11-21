import type { TokenBalance } from "@/types/token";
import { Label } from "@/components/ui/label";

interface TokenSelectProps {
  tokens: TokenBalance[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function TokenSelect({ tokens, value, onChange, id = "token" }: TokenSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Select Token</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        required
      >
        <option value="">Select a token</option>
        {tokens.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol} - {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}

