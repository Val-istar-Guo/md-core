// g1 string, g2 endTag, g3 selfCloseTag, g4 startTag
import { vnode, vtext, annotation } from './wrap'
import { combineString } from '../utils'


const patt = /([\s\S]*?)((?:<!--(.*?)-->)|(?:<\/([\w-]+?)>)|(?:<(.+?)\/>)|(?:<(.+?)>))/g
const tagPatt = /<[\w-]>/


const parseProps = str => {
  const patt = / (\S+?)(?:=(["']?)(.*?)\2)?(?=\s|$)/g
  const group = []

  while(true) {
    const matched = patt.exec(str)
    if (!matched) break

    const [, key, , value] = matched
    group.push({ key, value: value || true })
  }

  return group
    .reduce((obj, { key, value }) => {
      obj[key] = value
      return obj
    }, {})
}

const parseTag = string => {
  const matched = /^([\w-]+)((?: \S+(?:=(["']?).*?\3))*)\s*$/.exec(string)
  if (!matched) throw new Error()

  const [, tagName, props] = matched
  const properties = parseProps(props)

  return { tagName, properties, children: [] }
}

const parse = string => {
  const stack = []
  let lastIndex = 0

  let node = {
    tagName: '',
    properties: {},
    children: [],
  }

  while (true) {
    const matched = patt.exec(string)

    if (!matched) {
      node.children.push(string.substr(lastIndex))
      break
    }

    lastIndex = patt.lastIndex
    const [, text, tagString, htmlAnnotation, endTag, selfCloseTag, startTag] = matched
    if (text) node.children.push(text)

    if (startTag) {
      stack.push(node)
      try {
        node = parseTag(startTag)
      } catch (e) {
        node.children.push(tagString)
      }
    } else if (endTag) {
      if (stack.length && node.tagName === endTag) {
        const node$ = vnode(node.tagName, node.properties, node.children)
        node = stack.pop()
        node.children.push(node$)
      } else {
        node.children.push(tagString)
      }
    } else if (selfCloseTag) {
      try {
        const { tagName, properties, children } = parseTag(selfCloseTag)
        const node$ = vnode(tagName, properties, children)
        node.children.push(node$)
      } catch (e) {
        node.children.push(tagString)
      }
    } else if (annotation) {
      const node$ = annotation(htmlAnnotation)
      node.children.push(node$)
    }
  }

  // 处理未出栈的标签
  while (stack.length) {
    // console.log('------------------')
    // console.log('node: ', node)
    // console.log('------------------')
    const node$ = vnode(node.tagName, node.properties, node.children)
    node = stack.pop()
    node.children.push(node$)
  }

  return combineString(node.children)
}

export default parse
