import VEl from './vel';


export default class extends VEl {
  constructor(tagName = 'node', props, children) {
    super(tagName, props, children);
    this.name = tagName;
  }

  toHtml() {
    const { tagName, children, props } = this;

    let props$ = Object.entries(props)
      .filter(pair => pair[1])
      .map(pair => {
        if (Array.isArray(pair[1])) pair[1] = pair[1].join(' ');
        return `${pair[0]}="${pair[1]}"`;
      })
      .join(' ');

    if (props$.length) props$ = ` ${props$}`;
    if (!children.length) return `<${tagName}${props$}/>`;

    const children$ = children
      .map(child => {
        if (typeof child === 'string') return child;
        return child.toHtml();
      })
      .join('');
    return `<${tagName}${props$}>${children$}</${tagName}>`;
  }
}
