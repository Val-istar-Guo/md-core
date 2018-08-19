export default ({ name, handle }) => initialOption => globalOption => ({
  preprocessors: [{
    name,
    handle(string, runtimeOption = {}) {
      const option = { ...globalOption, ...initialOption, ...runtimeOption }
      return handle(string, option)
    },
  }]
})
