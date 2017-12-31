import { Group, Node, TextN, TempN } from '../nodes';


// const depthOf = spaces => {
//   const depth = spaces.replace(/(?: {0,3}\\t| {4})/, "\t").length;
// };

// const parseLine = (line) => {
//   // g[1] = 空白符  g[2] 前缀  g[3] 内容
//   const patt = /^(\s*)([*+-]|\\d+\\.)[ \t]+(.*)/;

//   const [, spaces, prefix, content] = line.match(patt);
//   const depth = depthOf(spaces);
//   return { depth, prefix, content };
// }

const parseList = lines => {
  // patt = /^ {0,3}([*+-]|\\d+\\.) ((?:.*)((?:\n.*)|(?:\n\n\2.*))+)/mg;
  const patt = /^ {0,3}([*+-]|\d+\.)(( +)(.*)((\n *[^*+-\s].*)|(\n\n? \3.*))*)/mg
  const list = [];

  while (true) {
    const next = patt.exec(lines);
    if (!next) break;

    let [, prefix, content] = next;
    let li$;
    content = content.replace(/^ {0,4}/mg, '');

    if (/\n/.test(content)) {
      const blocks$ = new TempN('blocks', [content]);
      li$ = new Node('li', [blocks$]);
    } else {
      const inline$ = new TextN('inline', content);
      li$ = new Node('li', [inline$]);
    }

    list.push(li$);
  }

  return list;
};


export default {
  name: 'list',
  input: 'blocks',
  parse: vel => {
    // const patt = /^ {0,3}([*+-]|\\d+\\.)(\s+)(.*)((?:\n|(\n\n\2))[^*+-\n]*)+/mg;
    // const patt = /^ {0,3}([*+-]|\\d+\\.)( +)(.*)(\n|(\n\n \2))(([^\S\n\r]{4,}\S)|([^\S\n\r]{0,3}[^*+-\s])).*/mg
    const str = vel.children[0];
    const patt = /^( {0,3}([*+-]|\d+\.)( +)(.*)((\n *[^*+-\s].*)|(\n\n? \3.*))*(?:\n|$))+/mg
    const group = [];

    while (true) {
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

      const [list, prefix] = next;
      const items = parseList(list);
      let list$;
      console.log(items);

      if (/[*+-]/.test(prefix)) list$ = new Node('ul', items);
      else list$ = new Node('ol', items);

      group.push(list$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
