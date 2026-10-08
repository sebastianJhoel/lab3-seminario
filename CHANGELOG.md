
# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Soporte para conversión de precios a BOB, USD y EUR.
- Funciones `getCurrency` y `convert` para manejar monedas.
- Recibo imprimible (`buildReceipt`) y comando CLI `receipt SKU:CANTIDAD`.
- `formatPrice` acepta la opción `{ width }` para alinear precios.

### Changed
- `formatPrice` ahora acepta una moneda como segundo parámetro.
- Los precios pueden mostrarse en diferentes monedas.

### Fixed

## [1.0.0] - 2026-10-01

### Added
- Catálogo de productos (`products`, `findProductBySku`, `searchProducts`).
- Cálculo del total de un carrito (`calculateTotal`).
- Formato de precios en bolivianos (`formatPrice`).
- CLI básica con los comandos `list` y `search`.
