class SvelteUIError extends Error {
  constructor(m) {
    super(m);
    this.name = 'SvelteUIError';
  }
}

export function error(scope, message) {
  throw new SvelteUIError(`[${scope}] ${message}`);
}

export function debug(scope, message) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(new SvelteUIError(`[${scope}] ${message}`));
  }
}
