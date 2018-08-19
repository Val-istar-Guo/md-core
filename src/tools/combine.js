import { merge } from '../utils'


const nameEqual = (a, b) => a.name === b.name

export default (...args) => (initialOption = {}) => {
  let middlewares = args.map(middleware => middleware(initialOption))
  // let middlewares = args.map(middleware => {
  //   // console.log('combine middleware: ', middleware)
  //   return middleware(initialOption);
  // })

  return globalOption => {
    middlewares = middlewares.map(middleware => middleware(globalOption))

    // mix middlewares
    return middlewares.reverse().reduce(
      (obj, middleware) => {
        if (middleware.middlewares) obj.middlewares = merge(middleware.middlewares, obj.middlewares, nameEqual)
        if (middleware.preprocessors) obj.preprocessors = merge(obj.preprocessors, middleware.preprocessors, nameEqual)
        return obj
      },
      { middlewares: [], preprocessors: [] },
    )
  }
}
