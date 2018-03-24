import * as nodes from './nodes';
import parse from './parse';
import logger from './logger';

function Md(option = {}) {
  if (!(this instanceof Md)) {
    return new Md(option);
  }

  this.middlewares = [];
  this.option = {
    logger: logger(option.debug),
    ...option,
  };
  this.context = {};

  // NOTE: 防止不通过md.parse/md.use而直接调用parse/use失败
  this.parse = this.parse.bind(this);
  this.use = this.use.bind(this);
}

Md.prototype.parse = function (string) {
  if (typeof string !== 'string') {
    throw new Error(`md parse(): expect string but get ${typeof string}`);
  }

  const { middlewares, option, context } = this;
  return parse(middlewares, option, context, string);
}

Md.prototype.use = function (middleware) {
  this.middlewares.push(middleware);
  return this;
}

Md.nodes = nodes;

export default Md;
