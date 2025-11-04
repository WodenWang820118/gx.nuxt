/**
 * Format a number with comma separators
 * @param value - The number to format
 * @returns Formatted string with commas (e.g., 1,000)
 */
export function formatNumberWithCommas(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Format a price value (in cents) to a currency string with commas
 * @param cents - The price in cents (e.g., 1000 = $10.00)
 * @returns Formatted currency string (e.g., $10.00)
 */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
