const {expect} = require('chai')
const fs = require('fs')
const {
  createTempFile, parseCsvFromString
} = require('../lib/sync')

describe('Sync ', () => {

  describe('negative', () => {
    it('create temp file defaults not valid data undefined', () => {
      try {
        createTempFile()
      } catch({message}) {
        expect(message).to.include('Required argument type is string, got: undefined')
      }
    })

    it('create temp file defaults not valid data object', () => {
      try {
        createTempFile({})
      } catch({message}) {
        expect(message).to.include('Required argument type is string, got: object')
      }
    })

    it('parse csv from string not valid data undefined', () => {
      try {
        parseCsvFromString()
      } catch(error) {
        expect(error.message).to.include('Required argument type is string, got: undefined')
      }
    })

    it('parse csv from string not valid data object', () => {
      try {
        parseCsvFromString({})
      } catch(error) {
        expect(error.message).to.include('Required argument type is string, got: object')
      }
    })
  })

  describe('positive', () => {
    it('create temp file defaults and remove', () => {
      const {remove, filepath} = createTempFile('a')
      expect(typeof remove).to.eql('function')
      expect(typeof filepath).to.eql('string')
      expect(fs.existsSync(filepath)).to.eql(true)
      remove()
      expect(fs.existsSync(filepath)).to.eql(false)
    })
  })
})