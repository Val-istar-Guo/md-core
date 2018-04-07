// g1 string, g2 endTag, g3 selfCloseTag, g4 startTag
import { vnode, annotation } from './wrap'
import { isChild } from './validate'
import { combineString, htmlDecode } from '../utils'


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

const parse = (string, onlyDecodeChildString = false, onlyFirst = false) => {
  const stack = []
  let lastIndex = 0

  let node = {
    tagName: '',
    properties: {},
    children: [],
  }

  const pushString = (n, s) => {
    if (!onlyDecodeChildString || stack.length) {
      n.children.push(htmlDecode(s))
    } else n.children.push(s)
  }

  while (true) {
    // 如果设置onlyFirst, 则其实字符必须是标签，切只匹配第一个闭合标签
    if (onlyFirst && !stack.length && node.children.length) {
      if (isChild(node.children[0])) {
        pushString(node, string.substr(lastIndex))
        break
      } else {
        node.children = []
        pushString(node, string)
        break;
      }
    }

    const matched = patt.exec(string)

    if (!matched) {
      if (string.length > lastIndex) pushString(node, string.substr(lastIndex))
      break
    }

    lastIndex = patt.lastIndex
    const [, text, tagString, htmlAnnotation, endTag, selfCloseTag, startTag] = matched
    if (text) pushString(node, text)

    if (startTag) {
      stack.push(node)
      try {
        node = parseTag(startTag)
      } catch (e) {
        node = stack.pop()
        node.children.push(tagString)
      }
    } else if (endTag) {
      if (stack.length && node.tagName === endTag) {
        const node$ = vnode(node.tagName, node.properties, node.children)
        node = stack.pop()
        node.children.push(node$)
      } else {
        pushString(node, tagString)
      }
    } else if (selfCloseTag) {
      try {
        const { tagName, properties, children } = parseTag(selfCloseTag)
        const node$ = vnode(tagName, properties, children)
        node.children.push(node$)
      } catch (e) {
        pushString(node, tagString)
      }
    } else if (annotation) {
      const node$ = annotation(htmlAnnotation)
      node.children.push(node$)
    }
  }

  // 处理未出栈的标签
  while (stack.length) {
    // console.log('------------------')
    // console.log('stack: ', stack.length)
    // console.log('node: ', node)
    // console.log('------------------')
    const node$ = vnode(node.tagName, node.properties, node.children)
    node = stack.pop()
    node.children.push(node$)
  }

  return combineString(node.children)
}

export default parse
