import { Group, Node, TempN, TextN } from '../nodes';


// const alignPatt = /^ {0, 3}(\|\s*)?(?(:\s*)?-[-\s]*(:\s*)?\|)+/;
// const alignPatt = /^ {0,3}(\|\s*)?((:\s*)?-[-\s]*(:\s*)?\|\s*)+((:\s*)?-[-\s]*(:\s*)?(\|\s*)?)/gm;
const splitTr = str => str.replace(/(^\s*)|(\s*\|?\s*$)/g, "").split(/\s*\|\s*/)
// aligns
const LEFT = 1;
const CENTER = 2;
const RIGHT = 3;

const alignClassEnum = {
  [LEFT]: 'left',
  [CENTER]: 'center',
  [RIGHT]: 'right',
};

const alignStyleEnum = {
  [LEFT]: 'text-align: left',
  [CENTER]: 'text-align: center',
  [RIGHT]: 'text-align: right',
};

const parseAlign = (maxL,aligns) => {
  const arr = new Array(maxL);
  arr.fill(LEFT);

  aligns.reduce((arr, align, i) => {
    if (/^:.*:$/.test(align)) arr[i] = CENTER;
    else if (align.charAt(0) === ':') arr[i] = LEFT;
    else arr[i] = RIGHT;

    return arr;
  }, arr);

  return arr;
}

const fillTr = (maxL,line) => {
  const len = line.length;
  if (maxL > len) {
    const empty = new Array(maxL - len);
    empty.fill('');
    line.push(empty);
  }

  return line;
}

const parseTr = (aligns, maxL, childTag = 'td') => tr => {
  const children$ = fillTr(maxL, tr)
    .map((child, i) => {
      console.log(child);
      const inline$ = new TextN('inline', child);
      return new Node(childTag, {
        class: alignClassEnum[aligns[i]],
        style: alignStyleEnum[aligns[i]],
      }, [inline$]);
    });

  return new Node('tr', children$);
}

const parseTBody = (aligns, maxL, lines) => {
  const tbody = lines
    .map(parseTr(aligns, maxL))

  return new Node('tbody', tbody);
};

const parseTHead = (aligns, maxL, line) => {
  const tr$ = parseTr(aligns, maxL, 'th')(line);

  return new Node('thead', [tr$]);
};


export default {
  name: 'table',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    // const patt = /^ {0,3}((?:(?:\|\s*\S[^\|\n]*)+\|?)|(?:(?:\|\s*)?\S[^\|\n]*(?:(?:\|[^\|\n]+)+\|?|\|)))\n {0,3}((?:(?:\|\s*(?::\s*)?-[-\s]*(?::\s*)?)+\|?)|(?:(?:\|\s*)?(?::\s*)?-[-\s]*(?::\s*)?(?:(?:\|(?::\s*)?-[-\s]*(?::\s*)?)+\|?|\|)))\n((?: {0,3}(?:(?:(?:\|\s*\S[^\|\n]*)+\|?)|(?:(?:\|\s*)?\S[^\|\n]*(?:(?:\|[^\|\n]+)+\|?|\|)))(?:\n|$))+)/;
    const patt = /(^|\n)( {0,3}(\|?)(.*?\|)+(.*)?)\n( {0,3}(\|\s*)?((:\s*)?-[-\s]*(:\s*)?\|\s*)*((:\s*)?-[-\s]*(:\s*)?(\|\s*)?))\n( {0,3}(\|?)(.*?\|)+(.*)?(\n|$))*/g;
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


      let lines = next[0]
        .replace(/(^\n)|(\n$)/g, "")
        .split('\n')
        .map(splitTr);

      console.log('table', lines);

      const maxL = Math.max(...lines.map(line => line.length));
      const [thead, align, ...tbody] = lines;
      const aligns = parseAlign(maxL, align);
      const tbody$ = parseTBody(aligns, maxL, tbody);
      const thead$ = parseTHead(aligns, maxL, thead);

      const table$ = new Node('table', [thead$, tbody$]);
      group.push(table$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
