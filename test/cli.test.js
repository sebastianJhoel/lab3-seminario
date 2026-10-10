
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('el CLI rechaza cantidades que no son números', () => {
  const result = spawnSync(
    process.execPath,
    ['src/cli.js', 'receipt', 'MOU-002:abc'],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cantidad inválida/);
  assert.doesNotMatch(result.stdout, /NaN/);
});

test('el CLI rechaza cantidades iguales a cero', () => {
  const result = spawnSync(
    process.execPath,
    ['src/cli.js', 'receipt', 'MOU-002:0'],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Cantidad inválida/);
});

test('el CLI acepta cantidades enteras positivas', () => {
  const result = spawnSync(
    process.execPath,
    ['src/cli.js', 'receipt', 'MOU-002:2'],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Mouse Inalámbrico x2/);
  assert.match(result.stdout, /Bs 51\.00/);
});
