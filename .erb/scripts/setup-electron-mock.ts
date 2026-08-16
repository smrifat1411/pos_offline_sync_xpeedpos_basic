/**
 * Stubs the preload bridge for tests running under jsdom.
 *
 * Every renderer-to-main call in this app goes through `window.electron`, which
 * preload.ts injects and which therefore only exists inside Electron. Under jsdom
 * it is undefined, so any provider that fetches on mount - ProductContext is the
 * first - throws "Cannot read properties of undefined" before a test can assert
 * anything.
 *
 * The bridge is wide (products, orders, customers, expenses, salary, settings)
 * and grows, so this answers with a Proxy rather than a hand-listed set of
 * methods that would drift out of date. Every call resolves to the envelope the
 * providers destructure: `{ success, data }`.
 *
 * Tests that care about a specific response override the method they need.
 */
const emptyResult = async () => ({ success: true, data: [] });

Object.defineProperty(window, 'electron', {
  value: new Proxy(
    {},
    {
      get: () => emptyResult,
    },
  ),
  writable: true,
  configurable: true,
});

export {};
