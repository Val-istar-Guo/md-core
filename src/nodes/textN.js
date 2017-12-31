import Node from './node';


export default class extends Node {
  constructor(tagName = 'textN', props = {}, text) {
    if (typeof props === 'string') {
      text = props;
      props = {};
    }

    if (typeof text !== 'string') {
      throw new Error('TextN must have a string child');
    }

    super(tagName, props, [text]);
  }

  toHtml() {
    return this.children[0];
  }
}
