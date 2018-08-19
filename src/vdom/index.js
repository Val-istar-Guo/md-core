export default ({ separator = '' } = {}) => (tagName, properties = {}, children = []) => {
  let props$ = Object.entries(properties)
    .filter(pair => pair[1])
    .map(pair => {
      if (Array.isArray(pair[1])) pair[1] = pair[1].join(' ');
      return `${pair[0]}="${pair[1]}"`;
    })
    .join(' ');

  if (props$.length) props$ = ` ${props$}`;

  if (!children.length) return `<${tagName}${props$} />${separator}`;

  const children$ = children.join('');

  // console.log(tagName, props$, children$)
  return `<${tagName}${props$}>${children$}</${tagName}>${separator}`;
}
