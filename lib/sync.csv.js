const path = require('path')
const fs = require('fs')

const parseCsvFile = (filepath, separator = ',', everyRowWithItems = true) => {

  if(!filepath || !fs.existsSync(filepath)) {
    throw new Error(`File ${filepath} was not found`)
  }

  const original = fs.readFileSync(filepath).toString('utf8').trim()
  const arrayData = original.split('\n')
  // header is first row
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

  const arrayView = [header]; arrayView.push(...arrayData.map(item => item.split(separator)))

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

const formCsvFile = (originalCvsFormat, ...patterns) => {
  return patterns.map((acc, {pattern = '', value = ''}) => {
    const reformated = acc.replace(pattern, value())
    return reformated
  }, originalCvsFormat)
}

module.exports = {
  parseCsvFile
}
