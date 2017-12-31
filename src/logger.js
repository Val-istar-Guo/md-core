export const createDebug = opts => (...arg) => opts.isDebug && console.log(...arg);
