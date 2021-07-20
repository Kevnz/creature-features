const creature = require('../index')
const locationFeatures = creature({
  location: './test/features/rules',
})

const end = (label, hrstart) => {
  // console.log(hrstart)
  // execution time simulated with setTimeout function

  const hrend = process.hrtime(hrstart)
  /*
  console.info(`Start ${label}`)
  console.info(label + ' Execution time: %dms', end)
  console.info(
    label + ' Execution time (hr): %ds %dms',
    hrend[0],
    hrend[1] / 1000000
  )
  console.info(`End ${label}`)
  */
  return hrend[1] / 1000000
}

describe('Feature based on rules and timer', () => {
  it('should when passed a parameter evaluate the rule and return true or false and log time', () => {
    const start = new Date()
    const hrstart = process.hrtime()
    const creature = require('../index')
    const locationFeatures = creature({
      location: './test/features/rules',
    })
    end('start', hrstart, start)
    const start1 = new Date()
    const hrstart1 = process.hrtime()
    expect(locationFeatures.EmailBasedFeature('test@example.com')).toBe(true)
    end('1st call', hrstart1, start1)
    const start2 = new Date()
    const hrstart2 = process.hrtime()
    expect(locationFeatures.EmailBasedFeature('nope@example.com')).toBe(false)
    end('final', hrstart2, start2)
  })

  const loops = Array(1500).fill(0)
  const bigLoop = Array(5000).fill(0)
  describe.each(loops)('Time it', async () => {
    test('Test perfs', async () => {
      const start = new Date()
      const hrstart = process.hrtime()
      end('Setup', hrstart, start)
      const start1 = new Date()
      const hrstart1 = process.hrtime()
      expect(locationFeatures.EmailBasedFeature('test@example.com')).toBe(true)
      end('1st call', hrstart1, start1)
      const start2 = new Date()
      const hrstart2 = process.hrtime()
      expect(locationFeatures.EmailBasedFeature('nope@example.com')).toBe(false)
      end('final', hrstart2, start2)
      end('End of test', hrstart, start)
    })
  })
  describe.each(bigLoop)('Time it against a normal function', async () => {
    test('Test one call versus one handmade call', async () => {
      const returner = (name) => {
        if (name === 'nope@example.com') return true
        return false
      }
      const start = new Date()
      const hrstart = process.hrtime()

      end('Setup', hrstart, start)
      const start1 = new Date()
      const hrstart1 = process.hrtime()
      expect(locationFeatures.EmailBasedFeature('test@example.com')).toBe(true)
      const featureTime = end('The Feature Check', hrstart1, start1)
      const start2 = new Date()
      const hrstart2 = process.hrtime()
      expect(returner('nope@example.com')).toBe(true)
      const normalTime = end('The Normal', hrstart2, start2)
      const diff = (featureTime - normalTime) * 100

      expect(diff).toBeLessThanOrEqual(1150)
    })
  })
})
