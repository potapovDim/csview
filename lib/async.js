const fs = require('fs')
const {parseCsvFromString} = require('./commons')

async function asyncParseCsvFile(filepath, separator = ',', everyRowWithItems = true) {

  if(!filepath || !fs.existsSync(filepath)) {
    throw new Error(`File ${filepath} was not found`)
  }

  const _streamOriginal = fs.createReadStream(filepath)

  _streamOriginal.on('error', (error) => {
    throw new Error(error)
  })


  return parseCsvFromString(original, separator, everyRowWithItems)
}


module.exports = {
  asyncParseCsvFile
}
