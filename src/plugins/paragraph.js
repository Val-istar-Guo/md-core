import { TempN, TextN, Group, Node } from '../nodes';


// const pattern = /(^.+?)(?:\n|$)(?:\s*\n)*([\s\S]*$)/

export default {
  name: 'paragraph',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    const patt = /([\s\S]+?)(?:(?:\n(?:\s*\n)+)|$)/g;
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

      if (next.index !== lastIndex) {
        const blocks = str.substring(lastIndex, next.index);
        group.push(new TempN('blocks', [blocks]));
      }

      const p = next[0].replace(/\s*\n/g, '');
      if (p.length) {
        const inline$ = new TextN('inline', p);
        const p$ = new Node('p', [inline$]);
        group.push(p$);
      } else {
        const empty$ = new TextN('empty', '');
        group.push(empty$);
      }
    }

    if (!group.length) return ;
    else if (group.length > 1) return new Group(group);
    return group[0];
  }
};
