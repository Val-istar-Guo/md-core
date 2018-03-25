import {
  isVNode, isChild, isFragment,
  vnode, vtext, fragment,
  format,
} from './nodes';


const parseArray = (middlewares, option, context, arr) => {
  const results = arr
    .map(child => parse(middlewares, option, context, child));

  return [].concat.apply([], results);
}

const parse = (middlewares, option, context, node) => {
  let result = node;
  const { logger } = option;

  logger('-----------------');
  logger('**** input: ', node);

  // 尝试编译，如果有中间件能够进行编译，则result !== node
  for (let middleware of middlewares) {
    if (node.name === middleware.input) {
      logger(`**** middleware: ${middleware.name || 'unknow'}@${middleware.version || 'unknow'}`);
      result = middleware.parse(node, option, context);

      if (result !== node) {
        result.option = option;
        result.context = context;
        break;
      }
    }
  }

  logger('**** output: ', result);
  logger('**** judge: ', result !== node);
  logger('-----------------');

  // 如果被编译过，则继续的标签继续尝试
  if (Array.isArray(result)) {
    result = result.map(format);
    return parseArray(middlewares, option, context, result);
  }
  if (typeof result === 'string') result = vtext(result);
  // OPTIMIZE: if result is not string or array, ex. number, how to handle it?
  if (result !== node) return parse(middlewares, option, context, result);

  // 当可不被继续编译，则对其子节点编译
  if (isFragment(node)) return parseArray(middlewares, option, context, node.children);
  if (isVNode(node)) {
    node.children = parseArray(middlewares, option, context, node.children);
  }

  return node;
}

export default (middlewares, option, context, string) => {
  const source$ = vtext(string);
  source$.name = 'source';
  source$.option = option;
  source$.context = context;

  option.logger('========START========');
  const result = parse(middlewares, option, context, source$);
  option.logger('=========END=========');
  return isChild(result) ? result : fragment(result) ;
}
