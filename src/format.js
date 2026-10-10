/**
 * Da formato a un precio para mostrarlo al usuario.
 *
 * @param {number} amount Monto en bolivianos.
 * @param {object|string} [options] Moneda o configuración.
 * @param {object} [extra] Opciones adicionales cuando la moneda es un string.
 * @returns {string} Precio formateado.
 */
import { convert, getCurrency } from './currency.js';

export function formatPrice(amount, options = {}, extra = {}) {
  let currency = 'BOB';
  let width = 0;

  if (typeof options === 'string') {
    currency = options;
    ({ width = 0 } = extra);
  } else {
    ({ currency = 'BOB', width = 0 } = options);
  }

  const converted = convert(amount, currency);
  const { symbol } = getCurrency(currency);
  const formatted = `${symbol} ${converted.toFixed(2)}`;

  return formatted.padStart(width);
}
