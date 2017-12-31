import { Group, Node, TempN } from '../nodes';


const className = {
  '-': 'dash',
  '_': 'underline',
  '*': 'asterisk',
}

// const pattern = /^(?:([\s\S]*?)\n)?[ \t]*(([-_*])(?:[ \t]*\3){2,})[ \t]*(?:\n|$)([\s\S]*$)/;
export default {
  name: 'hr',
  input: 'blocks',
  parse: (vel, opts) => {
    const patt = /^[ \t]*(([-_*])(?:[ \t]*\2){2,})[ \t]*(?:\n|$)/mg;
    const str = vel.children[0];
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

      const hr$ = new Node('hr');
      group.push(hr$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
