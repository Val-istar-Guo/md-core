import {
  isVNode, isChild, isFragment,
  vnode, vtext, fragment,
  format,
} from './nodes';


const matchName = (middleware, node, option) => {
  const { input } = middleware;
  const { name } = node;

  if (typeof input === 'string') return input === name;
  if (typeof input === 'function') return input(name);
  if (input instanceof RegExp) return input.test(name);

  console.warn(`[md-core] the middleware: ${middleware.name || 'unknow'}@${middleware.version || 'unknow'}'s input property is illegal`);
  return false;
}

const matchMiddleware = (middlewares, option, context, node) => {
  for (let middleware of middlewares) {
    if (matchName(middleware, node, option)) {
      /**
       * 尝试编译
       * 如果有中间件返回 node || undefined || null
       * 则该中间价无法解析该节点
       */
      let result = middleware.parse(node, option, context);

      if (result === node || result === undefined || result === null) continue;

      result.option = option;
      result.context = context;

      if (Array.isArray(result)) result = result.map(format);
      else if (!isChild(result)) result = format(result);

      return { matched: true, result, middleware };
    }
  }

  return { matched: false };
}

const parseArray = (middlewares, option, context, arr) => {
  const results = arr
    .map(child => parse(middlewares, option, context, child));

  return [].concat.apply([], results);
}

const parse = (middlewares, option, context, node) => {
  // const { notice } = option.logger;

  const { matched, result, middleware } = matchMiddleware(middlewares, option, context, node);

  if (matched) {
    // console.log('[md-core] input: ', node);
    // console.log(`[md-core] middleware: ${middleware}`);
    // console.log('[md-core] output: ', result);
    // console.log('---------------------------------------------------------------------------------------');

    if (Array.isArray(result)) return parseArray(middlewares, option, context, result);
    return parse(middlewares, option, context, result);
  }

  // console.log('[md-core] unmatched', node)

  if (isFragment(node)) return parseArray(middlewares, option, context, node.children);
  if (isVNode(node)) node.children = parseArray(middlewares, option, context, node.children);
  return node;
}

export default (middlewares, option, context, string) => {
  // const { notice } = option.logger;

  const source$ = vtext(string);
  source$.name = 'source';
  source$.option = option;
  source$.context = context;

  // console.log('========START========');
  const result = parse(middlewares, option, context, source$);
  // console.log('=========END=========');
  return isChild(result) ? result : fragment(result) ;
}
