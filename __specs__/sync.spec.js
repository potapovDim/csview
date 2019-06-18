const {expect} = require('chai')
const fs = require('fs')
const {
  createTempFile, parseCsvFromString
} = require('../lib/sync')

describe('Sync ', () => {
  it('create temp file defaults and remove', () => {
    const {remove, filepath} = createTempFile('a')
    expect(typeof remove).to.eql('function')
    expect(typeof filepath).to.eql('string')
    expect(fs.existsSync(filepath)).to.eql(true)
    remove()
    expect(fs.existsSync(filepath)).to.eql(false)
  })

  it('create temp file defaults not valid data', () => {
    try {
      createTempFile()
    } catch({message}) {
      expect(error.message).to.include('Required argument type is string, got: undefined')
    }
  })

  it('parseCsvFromString')
})