
/**
 * Da formato a un precio para mostrarlo al usuario.
 *
 * Permite seleccionar la moneda y el ancho del texto.
 * Siempre muestra dos decimales.
 *
 * @param {number} amount Monto en bolivianos.
 * @param {object|string} options Moneda o configuración.
 * @returns {string} Precio formateado.
 *
 * @example
 * formatPrice(10)                 // 'Bs 10.00'
 * formatPrice(10, 'USD')          // '$ 1.45'
 * formatPrice(10, { width: 12 })  // '    Bs 10.00'
 */
import { convert, getCurrency } from './currency.js';

export function formatPrice(amount, options = {}) {
  let currency = 'BOB';
  let width = 0;

  if (typeof options === 'string') {
    currency = options;
  } else {
    ({ currency = 'BOB', width = 0 } = options);
  }

  const converted = convert(amount, currency);
  const { symbol } = getCurrency(currency);

  return `${symbol} ${converted.toFixed(2)}`.padStart(width);
}
