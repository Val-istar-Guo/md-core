import { node, isRSTNode } from './node'


export default value => {
  if (isRSTNode(value)) return value

  // NOTE: should i throw Error when child is object || array || null || undefined
  return node(`${value}`)
}
