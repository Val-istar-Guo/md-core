export const createDebug = opts => (...arg) => opts.debug && console.log(...arg);
