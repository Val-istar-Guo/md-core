export default str => {
  if (str.length ===0) return

  str = str.replace(/&amp;/g, '&')
  str = str.replace(/&lt;/g, '<')
  str = str.replace(/&gt;/g, '>')
  str = str.replace(/&#39;/g, '\'')
  str = str.replace(/&quot;/g, '\"')

  return str
}
