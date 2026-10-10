import { round2 } from './money.js';
import { applyDiscount } from './discounts.js';
import { addTax } from './tax.js';

/**
 * Calcula el total de un carrito de compras.
 *
 * Reglas actuales:
 *  - El total es la suma de precio * cantidad de cada ítem.
 *  - Si se indica un código válido, se aplica el descuento.
 *  - Si includeTax es true, se aplica el IVA después del descuento.
 *  - El resultado se redondea a 2 decimales.
 *  - Un carrito vacío vale 0.
 *
 * @param {Array<{price: number, quantity: number}>} items Ítems del carrito.
 * @param {object} [options] Opciones del cálculo.
 * @param {string} [options.discountCode] Código de descuento.
 * @param {boolean} [options.includeTax=false] Si es true, suma el IVA (13 %).
 * @returns {number} Total del carrito.
 *
 * @example
 * calculateTotal([]) // 0
 * calculateTotal([{ price: 10, quantity: 2 }]) // 20
 * calculateTotal([{ price: 100, quantity: 1 }], { discountCode: 'SAVE10' }) // 90
 * calculateTotal([{ price: 100, quantity: 1 }], { includeTax: true }) // 113
 * calculateTotal([{ price: 100, quantity: 1 }], { discountCode: 'SAVE10', includeTax: true }) // 101.7
 */
export function calculateTotal(items, { discountCode, includeTax = false } = {}) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discounted = applyDiscount(subtotal, discountCode);
  const total = includeTax ? addTax(discounted) : discounted;
  return round2(total);
}