export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

export function validateSendForm(
  recipientAddress: string,
  sendAmount: string,
  selectedToken: string
): string | null {
  if (!recipientAddress || !sendAmount || !selectedToken) {
    return "Please fill in all fields";
  }

  if (!isValidAddress(recipientAddress)) {
    return "Invalid recipient address";
  }

  if (!isValidAmount(sendAmount)) {
    return "Invalid amount";
  }

  return null;
}

