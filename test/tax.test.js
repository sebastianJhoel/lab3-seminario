import test from 'node:test';
import assert from 'node:assert/strict';
import { TAX_RATE, calculateTax, addTax, calculateTotal } from '../src/index.js';

test('la tasa de IVA es 13 %', () => {
  assert.equal(TAX_RATE, 0.13);
});

test('calculateTax(100) devuelve 13', () => {
  assert.equal(calculateTax(100), 13);
});

test('addTax(100) devuelve 113', () => {
  assert.equal(addTax(100), 113);
});

test('addTax redondea a 2 decimales', () => {
  assert.equal(addTax(10.55), 11.92);
});

test('calculateTotal suma el IVA solo con includeTax', () => {
  const items = [{ price: 100, quantity: 1 }];
  assert.equal(calculateTotal(items), 100);
  assert.equal(calculateTotal(items, { includeTax: true }), 113);
});


test('aplica descuento y luego IVA: 100 con SAVE10 da 101.70', () => {
  assert.equal(
    calculateTotal(
      [{ price: 100, quantity: 1 }],
      { discountCode: 'SAVE10', includeTax: true }
    ),
    101.7,
  );
});