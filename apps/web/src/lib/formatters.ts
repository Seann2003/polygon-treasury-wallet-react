export function formatBalance(balance: string, decimals: number): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals > 6 ? 6 : decimals,
  });
}
