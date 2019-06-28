
function parseCsvFromString(original, separator = ',', everyRowWithItems = true) {
  if(!original || typeof original !== 'string') {
    throw new Error(`
      Required argument type is string, got: ${typeof arguments[0]}
    `)
  }

  const arrayData = original.split('\n')
  // header is first row
  // console.log(arrayData)
  const header = arrayData.shift().split(separator).map(item => item.trim())

  // check that every row has all items from header
  if(everyRowWithItems) {
    const isEveryRowHasRequiredItems = arrayData
      .find((item) => item
        .split(separator)
        .map(item => item.trim()).length !== header.length
      )
    if(isEveryRowHasRequiredItems) {
      throw new Error(`
        Row with data ${JSON.stringify(isEveryRowHasRequiredItems)} does not contais required fields
      `)
    }
  }

  const arrayView = [header, ...arrayData.map(item => item.split(separator))];

  const objectView = arrayData.map((arrItem) => {
    return header.reduce((acc, item, index) => {
      acc[item] = arrItem[index]
      return acc
    }, {})
  })

  return {
    original,
    arrayView,
    objectView
  }
}

module.exports = {
  parseCsvFromString
}
