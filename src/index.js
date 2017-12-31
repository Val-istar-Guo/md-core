import { Node, TempN, Group } from './nodes';
import { createDebug } from './logger';


const parse = (queue, ctx, opts, root) => {
  const debug = createDebug(opts);

  const parseVel = vel => {
    if (vel instanceof Group) return parseG(vel);
    if (vel instanceof Node) return parseN(vel);

    return vel;
  };

  const parseArr = group => {
    const children = [];
    group.forEach(vel => {
      children.push(parseVel(vel));
    });
    return children;
  };

  const parseG = group => {
    const children = parseArr(group);

    if (children.length === 1) return children[0];
    return new Group(children);
  };

  const parseN = node => {
    let rs = null;

    debug('-----------------');
    debug('**** input: ', node);

    for (let middleware of queue) {
      if (node.name === middleware.input) {
        debug('**** middleware: ', middleware.name || 'unknow');
        rs = middleware.parse(node, ctx);
        if (rs !== node) break;
      }
    }

    debug('**** output: ', rs);
    debug('**** judge: ', rs !== null, rs !== node);
    debug('-----------------');

    if (rs !==null && rs !== node) return parseVel(rs);
    if (node.children.length) {
      node.children = parseArr(node.children);
    }
    return node;
  }

  return parseVel(root);
}


const Md = function () {
  if (!(this instanceof Md)) {
    return new Md();
  }

  this.__middleware_queue = [];
}

Md.prototype.parse = function (str, opts = {}) {
  if (typeof str !== 'string') {
    throw new Error(`md parse(): expect string but get ${typeof str}`);
  }

  const ctx = {};
  const blocks = new TempN('source', [str]);
  return parse(this.__middleware_queue, ctx, opts, blocks);
}

Md.prototype.use = function (middleware) {
  this.__middleware_queue.push(middleware);
  return this;
}

export default Md;
