import VNode from './vnode';
import VText from './vtext';
import Fragment from './fragment';


const isVText = object => object instanceof VText;
const isVNode = object => object instanceof VNode;
const isFragment = object => object instanceof Fragment;
const isChild = object => isVNode(object) || isVText(object) || isFragment(object);


const format = child => {
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

const nodeWrap = Node => (tagName, properties = {}, children = []) => {
  if (Array.isArray(properties)) {
    children = properties,
    properties = {};
  }

  children = children.map(format);

  return new Node(tagName, properties, children)
}

const wrap = Text => (...arg) => new Text(...arg);


const vtext = wrap(VText);
const fragment = wrap(Fragment);
const vnode = nodeWrap(VNode);


export {
  VNode,
  VText,

  isVNode,
  isVText,
  isFragment,
  isChild,

  nodeWrap,
  wrap,

  vtext,
  vnode,
  fragment,
};
