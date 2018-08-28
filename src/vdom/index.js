import { htmlEncode, combineString } from '../utils'


export default ({ separator = '' } = {}) => (tagName, properties = {}, children = []) => {
  let props$ = Object.entries(properties)
    .filter(pair => pair[1])
    .map(pair => {
      if (Array.isArray(pair[1])) pair[1] = pair[1].join(' ')
      return `${pair[0]}="${pair[1]}"`
    })
    .join(' ')

  if (props$.length) props$ = ` ${props$}`

  if (!children.length) return { type: 'vdom', value: `<${tagName}${props$} />${separator}` }

  const children$ = combineString(children)
    .map(child => {
      if (typeof child === 'string') return htmlEncode(child)
      else if (child.type === 'vdom') return child.value
      throw new Error('someone plugin generate unexpect vdom, please check the plugins')
    })
    .join('')

  // console.log(tagName, props$, children$)
  return { type: 'vdom', value: `<${tagName}${props$}>${children$}</${tagName}>${separator}` }
}
