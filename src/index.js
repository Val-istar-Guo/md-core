import parse from './parse'
import { merge } from './utils'


function Md(option = {}) {
  if (!(this instanceof Md)) return new Md(option)

  this.middlewares = []
  this.preprocessors = []

  this.option = option;
  this.context = {};

  // NOTE: 防止不通过md.parse/md.use而直接调用parse/use失败
  this.parse = this.parse.bind(this);
  this.use = this.use.bind(this);
}

Md.prototype.parse = function (string, runtimeOption = {}) {
  if (typeof string !== 'string') {
    throw new Error(`md parse(): expect string but get ${typeof string}`);
  }

  string = this.preprocessors
    .reduce((str, preprocessor) => preprocessor.handle(str), string)

  // 初始化一个新的上下文
  this.context = {};
  return parse(this.middlewares, runtimeOption, this.context, string);
}

Md.prototype.use = function (creator) {
  const { middlewares = [], preprocessors = [] } = creator(this.option)

  this.middlewares = merge(this.middlewares, middlewares)
  this.preprocessors = merge(this.preprocessors, preprocessors)

  return this;
}

export default Md;
