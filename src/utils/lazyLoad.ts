import { lazy } from 'react';

// Utility function to add a delay to component loading
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// LazyLoadComponent with configurable delay to prevent loading during fast scrolling
export const lazyLoadComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  delayMs: number = 300
) => {
  return lazy(() =>
    Promise.all([importFunc(), delay(delayMs)]).then(([moduleExports]) => moduleExports)
  );
};