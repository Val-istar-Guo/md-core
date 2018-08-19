export default class Lexical {
  constructor(string) {
    this.string = string
    this.index = 0
    this.end = !string.length
  }

  match(patt, unmatched, matched) {
    const { string, index } = this
    const group = [];

    const beforeString = string.substring(0, index)
    const str = string.substr(index)

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          group.push(unmatched(str.substr(lastIndex)));
        }
        break;
      }

      if (next.index !== lastIndex) {
        group.push(unmatched(str.substring(lastIndex, next.index)));
      }

      group.push(matched(next));
    }

    if (group.length && beforeString.length) return [unmatched(beforeString)].concat(group)
    else if (group.length) return group
    else return null
  }

  preview(offset = 1) {
    if (this.index + offset > this.string.length) return null

    // return this.string.substr(0, offset)
    return this.string.charAt(this.index + offset)
  }

  next(offset = 1) {
    const { index, string, end } = this

    if (end) return null

    this.index += offset

    // console.log(this.index, string.length, this.index >= string.length, this.string.substr(index, offset))

    if (this.index >= string.length) this.end = true
    return this.string.substr(index, offset)
    // return this.string.substr(0, offset)
    // return this.string.charAt(index)
  }

  backtrace(length = 1) {
    if (this.index > length) this.index -= length
    else this.index = 0

    if (this.index < this.string.length) this.end = false

    // console.log('backtrace: ', this.index, this.string.length)
  }

  toEnd() {
    return this.string.substr(this.index)
  }
}
