import { Group, Node, TextN } from '../nodes';


export default {
  name: 'image',
  input: 'inline',
  parse: vel => {
    const str = vel.children[0];
    const patt = /!\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)\s*(?:(["'])(\S*?)\3)?\)/g;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          const inline = str.substr(lastIndex);
          group.push(new TextN('inline', inline));
        }
        break;
      }

      if (next.index) {
        const inline = str.substring(lastIndex, next.index);
        group.push(new TextN('inline', inline));
      }

      console.log(next);
      const [, alt, src, , title] = next;
      const img$ = new Node('img', { alt, src, title });
      group.push(img$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
