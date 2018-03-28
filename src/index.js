import * as nodes from './nodes';
import parse from './parse';
// import logger from './logger';
import { compose, middleware } from './middleware';

function Md(option = {}) {
  if (!(this instanceof Md)) {
    return new Md(option);
  }

  this.middlewares = [];
  // this.option = {
  //   logger: logger(option.debug),
  //   ...option,
  // };
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

  // 初始化一个新的上下文
  this.context = {};
  return parse(this.middlewares, runtimeOption, this.context, string);
}

Md.prototype.use = function (middlewares) {
  middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
  middlewares = middlewares.map(middleware => middleware(this.option));

  this.middlewares.push(...middlewares);

  return this;
}


Md.nodes = nodes;
Md.middleware = middleware;
Md.compose = compose;


export default Md;
