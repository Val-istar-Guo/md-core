import VEl from './vel';


export default class extends VEl {
  constructor(children) {
    super('group', {}, children);
  }

  toHtml() {
    return this.children
      .map(child => child.toHtml())
      .join('');
  }

  toElement() {

  }

  render() {
  }
}
