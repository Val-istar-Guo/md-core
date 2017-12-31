import Node from './node';


export default class extends Node {
  constructor(tagName = 'tempN', props, children) {
    super(tagName, props, children);
  }

  toHtml() {
    throw new Error(`${this.tagName} expect someone middleware to parse:\n${this.children}\n`);
  }
}
