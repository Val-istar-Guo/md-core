import { Group, TextN } from '../nodes';


// Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
const pattern = /\\([\\`\*_{}\[\]()#\+.!\-])/;
export default {
  name: 'escaped',
  input: 'inline',
  parse: vel => {
    const str = vel.children[0];
    const patt = /\\([\\`\*_{}\[\]()#\+.!\-])/g;
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

      const escaped$ = new TextN('escaped', next[1]);
      group.push(escaped$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
