export const combineString = arr => {
  let stringArr = []
  const resultArr = []

  arr.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number') stringArr.push(value)
    else {
      if (stringArr.length) resultArr.push(stringArr.join(''))
      resultArr.push(value)
      stringArr = []
    }
  })

  if (stringArr.length) resultArr.push(stringArr.join(''))

  return resultArr
}

export const htmlEncode = str => {
  if(str.length == 0) return ''

  str = str.replace(/&/g, "&amp;")
  str = str.replace(/</g, "&lt;")
  str = str.replace(/>/g, "&gt;")
  // NOTE: should i auto parse space or rely on the browser
  // str = str.replace(/ /g, "&nbsp;")
  str = str.replace(/\'/g, "&#39;")
  str = str.replace(/\"/g, "&quot;")
  return str
}

export const htmlDecode = str => {
  if (str.length ===0) return

  str = str.replace('&amp;', '&')
  str = str.replace('&lt;', '<')
  str = str.replace('&gt;', '>')
  str = str.replace('&#39;', '\'')
  str = str.replace('&quot;', '\"')

  return str
}
