/**
 * Da formato a un precio para mostrarlo al usuario.
 *
 * Reglas actuales:
 *  - Permite seleccionar la moneda (BOB, USD o EUR).
 *  - Siempre muestra dos decimales.
 *  - Opcionalmente rellena a la izquierda hasta un ancho mínimo.
 *
 * @param {number} amount Monto en bolivianos.
 * @param {object|string} [options] Moneda o configuración.
 * @param {string} [options.currency='BOB'] Moneda de destino.
 * @param {number} [options.width=0] Ancho mínimo del texto.
 * @param {object} [extra] Opciones adicionales cuando la moneda es un string.
 * @returns {string} Precio formateado.
 *
 * @example
 * formatPrice(10)                    // 'Bs 10.00'
 * formatPrice(10, 'USD')             // '$ 1.45'
 * formatPrice(10, { width: 12 })     // '    Bs 10.00'
 * formatPrice(10, { currency: 'EUR' }) // '€ 1.33'
 * formatPrice(5, 'BOB', { width: 12 }) // '     Bs 5.00'
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
