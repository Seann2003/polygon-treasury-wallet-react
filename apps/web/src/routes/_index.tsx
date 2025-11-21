import type { Route } from "./+types/_index";
import { PageHeader } from "@/components/layout/page-header";
import { TokenBalances } from "@/components/tokens/token-balances";
import { SendTokensForm } from "@/components/send/send-tokens-form";
import { TransactionList } from "@/components/transactions/transaction-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Treasury Wallet" },
    {
      name: "description",
      content:
        "Polygon Treasury Wallet - Manage your token balances and transactions",
    },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <PageHeader
        title="Treasury Wallet"
        description="Manage your token balances and transactions on Polygon"
      />

      <div className="grid gap-6">
        <TokenBalances />
      </div>

      <SendTokensForm className="mt-6" />
      <TransactionList className="mt-6" />
    </div>
  );
}
