import VNode from './vnode';
import VText from './vtext';
import Fragment from './fragment';
import { isChild } from './validate';

export const format = child => {
  if (typeof child === 'string') {
    return new VText(child);
  } else if (typeof child === 'number') {
    return new VText(String(child));
  } else if (child === null || child === undefined) {
    return;
  } else if (isChild(child)) {
    return child;
  } else {
    throw new Error('unexpect element');
  }
};

export const nodeWrap = Node => (tagName, properties = {}, children = []) => {
  if (Array.isArray(properties)) {
    children = properties,
    properties = {};
  }

  children = children.map(format);

  return new Node(tagName, properties, children)
}

export const wrap = Text => (...arg) => new Text(...arg);
export const fragmentWrap = N => children => new N(children.map(format));



export const vtext = wrap(VText);
export const fragment = fragmentWrap(Fragment);
export const vnode = nodeWrap(VNode);
