export default class Fragment {
  constructor(children) {
    this.name = 'fragment';
    this.children = children;
    this.option = {};
    this.context = {};
  }

  nameAs(value) {
    this.name = value;
    return this;
  }

  toHTML() {
    const { separator = '' } = this.option;
    return this.children
      .map(child => child.toHTML())
      .join(separator)
  }
}
