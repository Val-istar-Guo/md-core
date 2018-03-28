import VNode from './vnode';
import VText from './vtext';
import Fragment from './fragment';
import { isChild } from './validate';
import { combineString } from '../utils';

export const format = child => {
  if (isChild(child)) return child;

  // NOTE: should i throw Error when child is object || array || null || undefined
  return vtext(`${child}`);
};

export const nodeWrap = Node => (tagName, properties = {}, children = []) => {
  if (Array.isArray(properties)) {
    children = properties,
    properties = {};
  }

  children = combineString(children);
  children = children.map(format);

  return new Node(tagName, properties, children)
}

export const wrap = Text => (...arg) => new Text(...arg);
export const fragmentWrap = N => children => new N(combineString(children).map(format));



export const vtext = wrap(VText);
export const fragment = fragmentWrap(Fragment);
export const vnode = nodeWrap(VNode);
