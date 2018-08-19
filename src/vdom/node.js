class Node {
  constructor(tagName, properties = {}, children = []) {
    this.count = children.length;
    this.tagName = tagName;
    this.properties = properties;
    this.children = children;
  }

  render(separator = '') {
    const { tagName, children, properties } = this;

    let props$ = Object.entries(properties)
      .filter(pair => pair[1])
      .map(pair => {
        if (Array.isArray(pair[1])) pair[1] = pair[1].join(' ');
        return `${pair[0]}="${pair[1]}"`;
      })
      .join(' ');

    if (props$.length) props$ = ` ${props$}`;

    if (!children.length) return `<${tagName}${props$} />`;

    const children$ = children
      .map(child => child.toHTML())
      .join(separator);

    return `<${tagName}${props$}>${children$}</${tagName}>`;
  }
}


