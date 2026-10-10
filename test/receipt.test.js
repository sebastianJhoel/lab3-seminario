
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReceipt } from '../src/index.js';

test('buildReceipt incluye el título y el total', () => {
  const receipt = buildReceipt([
    { name: 'Mouse Inalámbrico', price: 25.5, quantity: 2 },
  ]);
  const lines = receipt.split('\n');

  assert.equal(lines[0], '=== MINI TIENDA ===');
  assert.ok(lines[1].startsWith('Mouse Inalámbrico x2'));
  assert.ok(lines[1].endsWith('Bs 51.00'));
  assert.ok(lines[2].startsWith('TOTAL'));
  assert.ok(lines[2].endsWith('Bs 51.00'));
});

test('buildReceipt alinea los montos a la derecha (ancho 12)', () => {
  const receipt = buildReceipt([
    { name: 'Libro', price: 40, quantity: 1 },
  ]);
  const [, line] = receipt.split('\n');

  assert.equal(line.length, 28 + 12);
});

test('buildReceipt suma varios ítems', () => {
  const receipt = buildReceipt([
    { name: 'Mouse Inalámbrico', price: 25.5, quantity: 2 },
    { name: 'Libro', price: 40, quantity: 1 },
  ]);

  assert.ok(receipt.endsWith('Bs 91.00'));
});

test('buildReceipt aplica descuento SAVE10', () => {
  const receipt = buildReceipt(
    [{ name: 'Libro', price: 100, quantity: 1 }],
    { discountCode: 'SAVE10' },
  );

  assert.ok(receipt.endsWith('Bs 90.00'));
});

test('buildReceipt incluye IVA del 13 %', () => {
  const receipt = buildReceipt(
    [{ name: 'Libro', price: 100, quantity: 1 }],
    { includeTax: true },
  );

  assert.ok(receipt.endsWith('Bs 113.00'));
});

test('buildReceipt aplica descuento antes del IVA', () => {
  const receipt = buildReceipt(
    [{ name: 'Libro', price: 100, quantity: 1 }],
    { discountCode: 'SAVE10', includeTax: true },
  );

  assert.ok(receipt.endsWith('Bs 101.70'));
});

test('buildReceipt muestra el total en USD', () => {
  const receipt = buildReceipt(
    [{ name: 'Libro', price: 100, quantity: 1 }],
    { currency: 'USD' },
  );

  const lines = receipt.split('\n');
  assert.ok(lines[lines.length - 1].startsWith('TOTAL'));
  assert.ok(lines[lines.length - 1].includes('$'));
});
