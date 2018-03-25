import VNode from './vnode';
import VText from './vtext';
import Fragment from './fragment';

export const isVText = object => object instanceof VText;
export const isVNode = object => object instanceof VNode;
export const isFragment = object => object instanceof Fragment;
export const isChild = object => isVNode(object) || isVText(object) || isFragment(object);
