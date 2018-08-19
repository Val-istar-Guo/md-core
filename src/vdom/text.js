import { htmlEncode } from '../utils'

export default class VText {
  constructor(string) {
    this.text = string;
    this.length = string.length;
  }

  render() {
    return htmlEncode(this.text);
  }
}
