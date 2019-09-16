const expect = require('chai').expect
const sinon = require('sinon')

const pages = require('./pages')

describe('Pages', () => {
  it('should return home', () => {
    const req = {}
    const res = {
      send: sinon.spy()
    }
    pages.home(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('CI/CD Project - dev')).to.be.true
  })
  it('should return page1', () => {
    const req = {}
    const res = {
      send: sinon.spy()
    }
    pages.page1(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('Page1')).to.be.true
  })
  it('should return page2', () => {
    const req = {}
    const res = {
      send: sinon.spy()
    }
    pages.page2(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('Page2')).to.be.true
  })
  it('should calc properly - divisivel', () => {
    const req = {
      params: {
        num1: 10,
        num2: 5
      }
    }
    const res = {
      send: sinon.spy()
    }
    pages.calc(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('Divisivel')).to.be.true
  })
  it('should calc properly - nao divisivel', () => {
    const req = {
      params: {
        num1: 10,
        num2: 6
      }
    }
    const res = {
      send: sinon.spy()
    }
    pages.calc(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('NaoDivisivel')).to.be.true
  })

  it('should calc properly - nao divisivel zero', () => {
    const req = {
      params: {
        num1: 10,
        num2: 0
      }
    }
    const res = {
      send: sinon.spy()
    }
    pages.calc(req, res)
    expect(res.send.calledOnce).to.be.true
    expect(res.send.calledWith('DivisaoZero')).to.be.true
  })
})