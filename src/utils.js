export const combineString = arr => {
  let stringArr = []
  const resultArr = []

  arr.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number') stringArr.push(value)
    else {
      if (stringArr.length) resultArr.push(stringArr.join(''))
      resultArr.push(value)
      stringArr = []
    }
  })

  if (stringArr.length) resultArr.push(stringArr.join(''))

  return resultArr
}

export const htmlEncode = str => {
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

export const htmlDecode = str => {
  if (str.length ===0) return

  str = str.replace('&amp;', '&')
  str = str.replace('&lt;', '<')
  str = str.replace('&gt;', '>')
  str = str.replace('&#39;', '\'')
  str = str.replace('&quot;', '\"')

  return str
}

export const flatten = array => {
  return [].concat.apply([], array);
}

export const merge = (array1, array2, equal) => {

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

