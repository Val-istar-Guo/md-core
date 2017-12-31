import { Group, Node, TextN, TempN } from '../nodes';


export default {
  name: 'code',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg;
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

      const [code] = next;
      const pre$ = new Node('pre', [code]);
      const code$ = new Node(`code`, [pre$]);
      group.push(code$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
