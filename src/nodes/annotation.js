export default class Annotation {
  constructor(string) {
    this.name = 'annotation'
    this.text = string
    this.option = {}
    this.context = {}
  }

  toHTML() {
    return ''
  }
}
