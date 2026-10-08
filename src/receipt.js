import { round2 } from './money.js';
import { formatPrice } from './format.js';
// Anchos de columna del recibo
const LABEL_WIDTH = 28;
const AMOUNT_WIDTH = 12;

/**
 * Construye un recibo imprimible de varias líneas.
 *
 * @param {Array<{name: string, price: number, quantity: number}>} items
 * @returns {string}
 */
export function buildReceipt(items) {
  const lines = ['=== MINI TIENDA ==='];
  let total = 0;

  for (const { name, price, quantity } of items) {
    const subtotal = round2(price * quantity);
    total = round2(total + subtotal);
    lines.push(
      `${name} x${quantity}`.padEnd(LABEL_WIDTH) +
        formatPrice(subtotal, { width: AMOUNT_WIDTH }),
    );
  }

  lines.push('TOTAL'.padEnd(LABEL_WIDTH) + formatPrice(total, { width: AMOUNT_WIDTH }));
  return lines.join('\n');
}