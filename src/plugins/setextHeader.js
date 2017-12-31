import { Group, Node, TextN, TempN } from '../nodes';

export default {
  name: 'setext header',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    const patt = /(.*)\n([-=])\2\2+(?:\n|$)/g;
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

      const tagName = next[2] === '=' ? 'h1' : 'h2';
      const inline$ = new TextN('inline', next[1]);
      const header$ = new Node(tagName, [inline$]);
      group.push(header$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
