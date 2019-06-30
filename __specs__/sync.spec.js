const {expect} = require('chai')
const fs = require('fs')
const {createTempFile, parseCsvFromString} = require('../lib')

describe('Sync ', () => {

  describe('negative', () => {
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
})