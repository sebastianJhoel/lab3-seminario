import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getCurrency, convert } from '../src/currency.js';

test('obtiene una moneda soportada', () => {
  assert.deepStrictEqual(getCurrency('USD'), {
    symbol: '$',
    rate: 0.145,
  });
});

test('convierte a USD', () => {
  assert.strictEqual(convert(100, 'USD'), 14.5);
});

test('convierte a EUR', () => {
  assert.strictEqual(convert(100, 'EUR'), 13.3);
});

test('usa BOB por defecto', () => {
  assert.strictEqual(convert(100), 100);
});

test('rechaza una moneda desconocida', () => {
  assert.throws(
    () => getCurrency('XYZ'),
    {
      message: 'Moneda no soportada: XYZ',
    }
  );
});