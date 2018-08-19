export default str => {
  if (str.length ===0) return

  str = str.replace('&amp;', '&')
  str = str.replace('&lt;', '<')
  str = str.replace('&gt;', '>')
  str = str.replace('&#39;', '\'')
  str = str.replace('&quot;', '\"')

  return str
}
