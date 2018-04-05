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

  return resultArr;
}
