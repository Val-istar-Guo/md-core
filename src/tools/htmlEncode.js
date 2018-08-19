export default str => {
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
