import { Group, Node, TextN, TempN } from '../nodes';


// const pattern = /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)([\s\S]*$)/mg;
export default {
  name: 'atxHeader',
  input: 'blocks',
  parse: function (vel) {
    const str = vel.children[0];
    const patt = /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/mg;
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

      const [, leave, header] = next;
      const inline$ = new TextN('inline', header);
      const header$ = new Node(`h${leave.length}`, [inline$]);
      group.push(header$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  }
};
