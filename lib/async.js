const fs = require('fs')
const {parseCsvFromString} = require('./commons')

async function asyncParseCsvFile(filepath, separator = ',', everyRowWithItems = true) {
  return new Promise((resolve) => {
    let _tempStreamData = ''

    if(!filepath || !fs.existsSync(filepath)) {
      throw new Error(`File ${filepath} was not found`)
    }

    const _streamOriginal = fs.createReadStream(filepath)

    _streamOriginal.on('error', (error) => {
      throw new Error(error)
    })

    _streamOriginal.on('data', (chunk) => {
      _tempStreamData += chunk.toString('utf8')
    })

    _streamOriginal.on('close', () => {
      resolve(parseCsvFromString(_tempStreamData, separator, everyRowWithItems))
    })
  })
}


module.exports = {
  asyncParseCsvFile
}
