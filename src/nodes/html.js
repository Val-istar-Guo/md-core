// g1 string, g2 endTag, g3 selfCloseTag, g4 startTag
import { vnode, vtext, annotation } from './wrap';
import { combineString } from '../utils';


const patt = /([\s\S]*?)((?:<!--(.*?)-->)|(?:<\/([\w-]*?)>)|(?:<(.*?)\/>)|(?:<(.*?)>))/g;
const tagPatt = /<[\w-]>/

const parseTag = string => {
  const [tagName, ...props] = string.split(/[\s\/]+/);

  if (!tagName || !/^[\w-]*$/.test(tagName)) throw new Error();

  const properties = props
    .filter(prop => !!prop)
    .map(prop => {
      const index = prop.indexOf('=');

      if (index === -1) {
        return [prop, 'true'];
      } else {
        const key = prop.substring(0, index);
        let value = prop.substr(index + 1);

        value = value.replace(/^(["']?)(.*)\1/,'$2');

        return [key, value];
      }
    })
    .reduce((obj, [k, v]) => {
      obj[k] = v;
      return obj;
    }, {});

    // console.log('parseTag: ', tagName, properties);
  return { tagName, properties, children: [] };
}

const parse = string => {
  const stack = [];
  let lastIndex = 0;

  let node = {
    tagName: '',
    properties: {},
    children: [],
  }

  while (true) {
    const matched = patt.exec(string);

    // if (!matched) break;
    if (!matched) {
      console.log(lastIndex, string.substr(lastIndex));
      node.children.push(string.substr(lastIndex));
      break;
    }

    lastIndex = patt.lastIndex;
    const [, text, tagString, htmlAnnotation, endTag, selfCloseTag, startTag] = matched;
    if (text) node.children.push(text);

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
        const { tagName, properties, children } = parseTag(selfCloseTag);
        const node$ = vnode(tagName, properties, children);
        node.children.push(node$)
      } catch (e) {
        node.children.push(tagString)
      }
    } else if (annotation) {
      console.log('==========annotation============');
      console.log(htmlAnnotation)
      const node$ = annotation(htmlAnnotation)
      node.children.push(node$)
    }
  }

  // 处理未出栈的标签
  while (stack.length) {
    // console.log('------------------');
    // console.log('node: ', node);
    // console.log('------------------');
    const node$ = vnode(node.tagName, node.properties, node.children);
    node = stack.pop()
    node.children.push(node$)
  }

  return combineString(node.children);
}

export default parse;
