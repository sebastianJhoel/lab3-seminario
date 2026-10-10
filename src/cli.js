#!/usr/bin/env node
import { products, searchProducts, formatPrice, findProductBySku, buildReceipt } from './index.js';

const commands = {
  list() {
    for (const product of products) {
      console.log(`${product.sku}  ${product.name.padEnd(28)} ${formatPrice(product.price)}`);
    }
  },

  search(...terms) {
    const results = searchProducts(terms.join(' '));
    if (results.length === 0) {
      console.log('Sin resultados.');
      return;
    }
    for (const product of results) {
      console.log(`${product.sku}  ${product.name}`);
    }
  },

  // Los comandos nuevos se registran debajo de esta línea
  receipt(...specs) {
    const items = specs.map((spec) => {
      const [sku, qty = '1'] = spec.split(':');
      const product = findProductBySku(sku);

      if (!product) {
        console.error(`SKU desconocido: ${sku}`);
        process.exit(1);
      }

      const quantity = Number(qty);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        console.error(
          `Cantidad inválida para ${sku}: ${qty}. Debe ser un entero mayor que 0.`,
        );
        process.exit(1);
      }

      return {
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    console.log(buildReceipt(items));
  },
};

const [, , name, ...args] = process.argv;

if (!name || !commands[name]) {
  console.log(`Uso: node src/cli.js <comando> [argumentos]`);
  console.log(`Comandos disponibles: ${Object.keys(commands).join(', ')}`);
  process.exit(name ? 1 : 0);
}

commands[name](...args);
