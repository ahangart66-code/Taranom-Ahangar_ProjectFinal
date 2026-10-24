/** Convert Persian/Arabic digits to Latin (0-9). */
export function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - '۰'.charCodeAt(0)))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - '٠'.charCodeAt(0)));
}

export function normalizeMobile(value: string): string {
  return toEnglishDigits(value).replace(/\D/g, '');
}
