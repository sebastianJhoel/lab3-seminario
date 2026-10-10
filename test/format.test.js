import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/index.js';

test('formatPrice usa bolivianos y dos decimales', () => {
  assert.equal(formatPrice(10), 'Bs 10.00');
  assert.equal(formatPrice(25.5), 'Bs 25.50');
  assert.equal(formatPrice(0), 'Bs 0.00');
});

test('formatPrice acepta moneda y ancho juntos', () => {
  assert.equal(formatPrice(5, 'BOB', { width: 12 }), '     Bs 5.00');
});

