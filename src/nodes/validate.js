import VNode from './vnode';
import VText from './vtext';
import Fragment from './fragment';
import Annotation from './annotation';


export const isVText = object => object instanceof VText
export const isVNode = object => object instanceof VNode
export const isFragment = object => object instanceof Fragment
export const isAnnotation = object => object instanceof Annotation
export const isChild = object =>
  isVNode(object) || isVText(object) || isFragment(object) || isAnnotation(object)
