import vdom from '../vdom'
import Lexical from '../lexical'


export const node = (type, value = '', children = []) => {
  if (Array.isArray(value)) {
    children = value
    value = ''
  } else if (typeof value !== 'string') {
    throw new Error('node value should be an string')
  }

  const lexical = new Lexical(value)

  return {
    name: 'ast_node',
    type,
    value,
    lexical,
    children,

    find() {},
    map() {},

    parse() {
      throw new Error(`cannot parse ${this.type}`)
    },

    toHTML(option) {
      const result = this.parse(vdom(option))
      return Array.isArray(result) ? result.join('') : result;
    },

    toVDom(h) {
      return this.parse(h)
    },
  }
}

export const isRSTNode = object => object.name === 'ast_node'
