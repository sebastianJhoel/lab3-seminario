import { round2 } from './money.js';

// Tasas de descuento por código promocional
export const DISCOUNT_CODES = { SAVE10: 0.1, SAVE20: 0.2, BLACKFRIDAY: 0.3 };

export function applyDiscount(amount, code) {
  if (typeof code !== 'string') return amount;
  const key = code.trim().toUpperCase();
  if (!Object.hasOwn(DISCOUNT_CODES, key)) return amount;
  return round2(amount * (1 - DISCOUNT_CODES[key]));
}