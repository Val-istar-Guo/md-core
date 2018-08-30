export default (array1, array2, equal) => {

  array1 = array1.map((value, i) => ({
    value,
    weight: i + 1,
  }))

  array2 = array2.map((value) => {
    const item = array1.find(item => equal(item.value, value));

    return {
      value,
      exist: !!item,
      weight: item ? item.weight : 0,
    }
  });

  // validate priority
  array2
    .filter(item => item.weight)
    .reduce((last, next) => {
      if (!last) return next
      if (last.weight > next.weight) throw new Error('权重错误')
    }, null);

  const diff = array2
    .reduce((arr, item) => {
      if (item.exist) {
        if (arr.length) {
          const last = arr[arr.length - 1]
          if (!last.before) last.before = item.value
        }
      } else if (!arr.length || arr[arr.length - 1].before) {
        arr.push({
          values: [item.value],
          before: null,
        })
      } else {
        const last = arr[arr.length - 1]
        last.values.push(item.value)
      }

      return arr
    }, [])


  const queue = []

  array1.map(item => {
    const beforeItem = diff.find(one => one.before && equal(one.before, item.value))
    if (beforeItem) queue.push(...beforeItem.values)
    queue.push(item.value)
  })

  const followItem = diff.find(one => one.before === null)
  if (followItem) queue.push(...followItem.values)

  return queue
}
