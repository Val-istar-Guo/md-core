export const combineString = arr => {
  let stringArr = []
  const resultArr = []

  arr.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number') stringArr.push(value)
    else {
      resultArr.push(stringArr.join(''), value)
      stringArr = []
    }
  })

  if (stringArr.length) resultArr.push(stringArr.join(''))

  return resultArr;
}
