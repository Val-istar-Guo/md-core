export default class VNode {
  constructor(tagName, properties = {}, children = []) {
    let count = children.length;
    // 编译后文字数
    let characters = 0;

    // children
      // .map(child => child.characters)
      // .reduce((sum, i) => sum + i, 0);

    // children.forEach(child => {
    //   if (isVNode(child)) {
    //     count += child.count;
    //     characters += child.characters;
    //   } else if (isVText(child)) {
    //     characters += child.length;
    //   }
    // })

    this.name = tagName;
    this.tagName = tagName;
    this.properties = properties;

    this.children = children;

    this.count = count;
    this.characters = characters;
    this.source = '';

    this.option = {};
    this.context = {};
  }

  nameAs(value) {
    this.name = value;
    return this;
  }

  toHTML() {
    const { tagName, children, properties, option } = this;
    const { separator = '' } = option;

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

  // to plain text
  toText() {
    return this.children.map(child => child.toText()).join('\n');
  }
}
