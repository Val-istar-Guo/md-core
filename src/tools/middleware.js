export default ({ name = 'unknow', version = 'unknow', input, parse }) => {
  let accept = null
  if (typeof input === 'string') accept = name => input === name;
  else if (input instanceof RegExp) accept = name => input.test(name);
  else if (typeof input === 'function') accept = input
  else {
    throw new TypeError(`[md-core] ${name}@${version} input should be a string, RegExp or function`);
  }

  if (typeof parse !== 'function') {
    throw new TypeError(`[md-core] ${name}@${version} initial error, 'parse' should be an function`);
  }

  return (initalOption = {}) => globalOption => {
    const staticOption = { ...globalOption, ...initalOption };

    return {
      middlewares: [{
        name,
        version,
        input,
        accept,
        parse: (node, rstNode, runtimeOption) => {
          const option = { ...staticOption, ...runtimeOption };
          return parse(node, rstNode, option);
        },
        toString: () => `${name}@${version}`,
      }],
    };
  }
}


// export const compose = middlewares => (option = {}) =>
//   middlewares.map(middleware => {
//     return middleware(option);
//   });
