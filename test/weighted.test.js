describe('Feature based on percents', () => {
  it('should take an object with a range of 50 50 and return a % of true results', () => {
    const creature = require('../src/file-based')
    const features = creature({
      location: './test/features/rules'
    })
    let trueTotal = 0
    for (let index = 0; index < 1000; index++) {
      if (features.PercentBasedFiftyFifty) {
        trueTotal++
      }
    }
    expect(trueTotal > 450).toBe(true)
    expect(trueTotal < 550).toBe(true)
  })
  it('should take an object with a range of 33 67 and return a % of true results', () => {
    const creature = require('../src/file-based')
    const features = creature({
      location: './test/features/rules'
    })
    let trueTotal = 0
    for (let index = 0; index < 1000; index++) {
      if (features.PercentBasedRuleOneThird) {
        trueTotal++
      }
    }
    expect(trueTotal > 300).toBe(true)
    expect(trueTotal < 375).toBe(true)
  })

  it('should when given a range that totals above or below 100 throw an error', () => {
    const creature = require('../src/file-based')
    const features = creature({
      location: './test/features/rules'
    })

    expect(() => features.InvalidUnderPercentRule).toThrow()
    expect(() => features.InvalidOverPercentRule).toThrow()
  })
  it('should take an object with a range of 33 67 and return a % of true results for 10000 calls', () => {
    const creature = require('../src/file-based')
    const features = creature({
      location: './test/features/rules'
    })
    let trueTotal = 0
    for (let index = 0; index < 10000; index++) {
      if (features.PercentBasedRuleOneThird) {
        trueTotal++
      }
    }

    expect(trueTotal > 3000).toBe(true)
    expect(trueTotal < 3750).toBe(true)
  })
})
