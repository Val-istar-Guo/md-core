const dEach = (arr, fn) => {
  arr.forEach(item => {
    if (Array.isArray(item)) item.forEach(fn);
    else fn(item);
  })
};


export default class {
  constructor(tagName, props = {}, children = []) {
    if (Array.isArray(props)) {
      children = props,
      props = {};
    }

    this.tagName = tagName;
    this.props = props;
    this.children = children;
    // this.append(...children);

    this.parent = null;
  }

  select(name) {

  }

  append(...children) {
    // children.forEach(child => child.parent = this);
    this.children.push(...children);
  }


  clean() {
    this.children = [];
  }

  forEach(fn) {
    dEach(this.children, fn);
    return this;
  }

  toHtml() {
    throw new Error('Unable to render');
  }
}
