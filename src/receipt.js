
import { round2 } from './money.js';
import { formatPrice } from './format.js';
import { calculateTotal } from './pricing.js';

// Anchos de columna del recibo
const LABEL_WIDTH = 28;
const AMOUNT_WIDTH = 12;

/**
 * Construye un recibo imprimible de varias líneas.
 *
 * @param {Array<{name: string, price: number, quantity: number}>} items
 * @param {object} [options]
 * @param {string} [options.discountCode]
 * @param {boolean} [options.includeTax=false]
 * @param {string} [options.currency='BOB']
 * @returns {string}
 */
export function buildReceipt(
  items,
  { discountCode, includeTax = false, currency = 'BOB' } = {},
) {
  const lines = ['=== MINI TIENDA ==='];

  for (const { name, price, quantity } of items) {
    const subtotal = round2(price * quantity);

    lines.push(
      `${name} x${quantity}`.padEnd(LABEL_WIDTH) +
        formatPrice(subtotal, { currency, width: AMOUNT_WIDTH }),
    );
  }

  const total = calculateTotal(items, { discountCode, includeTax });

  lines.push(
    'TOTAL'.padEnd(LABEL_WIDTH) +
      formatPrice(total, { currency, width: AMOUNT_WIDTH }),
  );

  return lines.join('\n');
}
