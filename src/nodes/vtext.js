import { htmlEncode } from '../utils'

export default class VText {
  constructor(string) {
    this.name = 'vtext';
    this.text = string;
    this.length = string.length;

    this.option = {};
    this.context = {};
  }

  nameAs(value) {
    this.name = value;
    return this;
  }

  toHTML() {
    return htmlEncode(this.text);
  }

  toText() {
    return this.text;
  }
}
