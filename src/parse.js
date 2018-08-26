import { node, root, isRSTNode, format } from './ast'
import { flatten } from './utils'


const  parse = (middlewares, astNode, option) => {
  // OPTIMIZE: 以middleware的input作为key生成一个mapping，如果不存在的key的astNode，进行循环（推荐使用缓存函数）
  for (let middleware of middlewares) {
    // console.log('middleware', middleware.toString())
    if (!middleware.accept(astNode.type)) continue
    const result = middleware.parse(astNode, node, option)

    // cannot parse node
    // if (result !== astNode && result) console.log('parse: ', middleware.toString())
    if (result === astNode || !result) continue

    if (Array.isArray(result)) return flatten(result.map(astNode => parse(middlewares, format(astNode), option)))
    return parse(middlewares, format(result), option)
  }

  astNode.children = flatten(astNode.children.map(astNode => parse(middlewares, astNode)))
  return astNode
}

export default (middlewares, option = {}, context = {}, string) => {
  // console.log('middlewares: ', middlewares.map(middleware => `${middleware.name}@${middleware.version}`))
  const source = node('source', string)
  const tree = parse(middlewares, source, option)

  return root(tree)
}
