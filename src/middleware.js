export const middleware = ({ name = 'unknow', version = 'unknow', input, parse }) => {
  if (!input) {
    throw new TypeError(`[md-core] ${name}@${version} inital error, 'input' should be set`);
  }
  if (typeof parse !== 'function') {
    throw new TypeError(`[md-core] ${name}@${version} initial error, 'parse' should be an function`);
  }

  return initalOption => globalOption => {
    const staticOption = { ...globalOption, ...initalOption };

    return {
      name,
      version,
      input,
      parse: (node, runtimeOption, context) => {
        const option = { ...staticOption, ...runtimeOption };
        return parse(node, option, context);
      },
      toString: () => `${name}@${version}`,
    };
  }
}


export const compose = middlewares => (option = {}) =>
  middlewares.map(middleware => {
    return middleware(option);
  });
