import { TempN } from '../nodes';


export default {
  name: 'normalize',
  input: 'source',
  parse: n => {
    const str = n.children[0];

    const blocks = str
      .replace(/^\s*\n/, "")
      .replace(/\s*$/, "");

    return new TempN('blocks', [blocks]);
  }
};
