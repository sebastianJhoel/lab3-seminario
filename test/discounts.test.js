import test from 'node:test';
import assert from 'node:assert/strict';
import { applyDiscount } from '../src/discounts.js';

test('SAVE10 descuenta 10%', () => {
  assert.equal(applyDiscount(100, 'SAVE10'), 90);
});

test('no distingue mayúsculas', () => {
  assert.equal(applyDiscount(100, 'save10'), 90);
});

test('código desconocido o undefined no cambia el monto', () => {
  assert.equal(applyDiscount(100, 'NOEXISTE'), 100);
  assert.equal(applyDiscount(100, undefined), 100);
});

test('ignora espacios alrededor del código', () => {
  assert.equal(applyDiscount(100, '  save10  '), 90);
});