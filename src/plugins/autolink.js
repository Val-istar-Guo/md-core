import { Group, Node, TextN } from '../nodes';


export default {
  name: 'autolink',
  input: 'inline',
  parse: vel => {
    const str = vel.children[0];
    const patt = /<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/g;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          const inline = str.substr(lastIndex);
          group.push(new TextN('inline', [inline]));
        }
        break;
      }

      if (next.index) {
        const inline = str.substring(lastIndex, next.index);
        group.push(new TextN('inline', [inline]));
      }

      let a$;
      const [, uri, protocol, email] = next;
      if (email) {
        a$ = new Node('a', {
          href: `mailto:${email}`,
        }, [email]);
      } else if (protocol === "mailto") {
        a$ = new Node('a', {
          href: encodeURI(uri),
        }, [uri.substr("mailto:".length)]);
      } else {
        a$ = new Node('a', {
          href: uri,
        }, [uri]);
      }
      group.push(a$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
};
