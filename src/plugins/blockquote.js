import { Group, Node, TempN } from '../nodes';

export default {
  name: 'blockquote',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    const patt = /^(?:>\s*.*(?:\n|$))+/mg;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          const blocks = str.substr(lastIndex);
          group.push(new TempN('blocks', [blocks]));
        }
        break;
      }

      if (next.index) {
        const blocks = str.substring(lastIndex, next.index);
        group.push(new TempN('blocks', [blocks]));
      }

      const blocks = next[0].replace(/^>[ \f\r\t\v]*/mg, "");
      const blocks$ = new TempN('blocks', [blocks]);
      const blockquote$ = new Node('blockquote', [blocks$]);
      group.push(blockquote$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
}
