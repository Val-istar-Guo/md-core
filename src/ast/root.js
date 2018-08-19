import { node, isRSTNode } from './node'

export default children => ({
  ...node('root', isRSTNode(children) ? [children] : children),
  parse(h) {
    return this.children.map(child => child.parse(h))
  }
})
