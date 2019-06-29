const fs = require('fs')

const _stream = fs.createReadStream('/Users/dpot/Documents/csview/misc/misc.first.csv')

_stream.on('open', () => {
  console.log('data')
})

_stream.on('data', (data) => {
  // console.log('____________________________ start')
  // console.log('____________________________')
  // console.log(data.toString('utf8'))
  // console.log('____________________________')
  // console.log('____________________________ end')
})

_stream.on('end', () => {
  console.log('end')
})

_stream.on('close', (data) => {
  console.log('close', data)
})

