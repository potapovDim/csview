const fs = require('fs')
const {parseCsvFromString} = require('./commons')

function parseCsvFile(filepath, separator = ',', everyRowWithItems = true) {

  if(!filepath || !fs.existsSync(filepath)) {
    throw new Error(`File ${filepath} was not found`)
  }

  const original = fs.readFileSync(filepath).toString('utf8').trim()
  return parseCsvFromString(original, separator, everyRowWithItems)
}

function formCsvFileFromArray(csvDataArra, separator = ',') {
  return csvDataArra.reduce((acc, item, index, originArr) => {
    const isNewLine = originArr.length - 1 === index ? '' : '\n'
    if(Array.isArray(item)) {
      acc += item.join(separator).trim()
    } else if(typeof item === 'object') {
      acc += Object.values(item).join(separator).trim()
    } else if(typeof item === 'string') {
      acc += item
    }
    acc = `${acc}${isNewLine}`
    return acc
  }, '')
}

function formCsvFile(originalCvsFormat, ...patterns) {
  return patterns.map((acc, {pattern = '', value = ''}) => {
    const reformated = acc.replace(pattern, value())
    return reformated
  }, originalCvsFormat)
}

module.exports = {
  parseCsvFile,
  formCsvFile,
  formCsvFileFromArray
}
