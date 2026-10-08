import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildReceipt } from '../src/index.js';

test('buildReceipt incluye el título y el total', () => {
  const receipt = buildReceipt([{ name: 'Mouse Inalámbrico', price: 25.5, quantity: 2 }]);
  const lines = receipt.split('\n');

  assert.equal(lines[0], '=== MINI TIENDA ===');
  assert.ok(lines[1].startsWith('Mouse Inalámbrico x2'));
  assert.ok(lines[1].endsWith('Bs 51.00'));
  assert.ok(lines[2].startsWith('TOTAL'));
  assert.ok(lines[2].endsWith('Bs 51.00'));
});

test('buildReceipt alinea los montos a la derecha (ancho 12)', () => {
  const receipt = buildReceipt([{ name: 'Libro', price: 40, quantity: 1 }]);
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