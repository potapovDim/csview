const fs = require('fs')
const {expect} = require('chai')
const {createTempFile} = require('../lib')

describe('Commons ', () => {

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