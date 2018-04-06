const htmlEncode = str => {
  if(str.length == 0) return '';

  str = str.replace(/&/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  // NOTE: should i auto parse space or rely on the browser
  // str = str.replace(/ /g, "&nbsp;");
  str = str.replace(/\'/g, "&#39;");
  str = str.replace(/\"/g, "&quot;");
  return str;
}

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
