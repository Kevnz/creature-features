const debug = require('debug')('Creature-Features')
const random = require('random-weighted')

module.exports = features => {
  const featureProxy = new Proxy(features, {
    get: (obj, prop) => {
      if (obj[prop] === undefined) {
        if (typeof prop === 'symbol') return false
        debug(`${prop} feature is undefined`)
        return false
      }

      if (obj[prop] === true || obj[prop] === false) {
        return obj[prop]
      }
      if (obj[prop].range !== undefined) {
        //validate
        const total = obj[prop].range.reduce(
          (previous, current) => previous + current,
          0
        )
        if (total !== 100) {
          throw new Error('Range values must total 100')
        }
        const range = obj[prop].range.map(v => v / 100)
        return random(range) === 0
      }

      return (...args) =>
        Reflect.apply(
          (...args) => {
            if (args.length === 2 && typeof args[1] === 'string') {
              const check = `
        'use strict';
        const ${obj[prop].parameters} = '${args[1]}'
        return ${obj[prop].check}`

              const funced = new Function(check)
              const result = funced()

              return result
            }
            const check = `
      'use strict';
      const { ${obj[prop].parameters} } = ${JSON.stringify(args[1])}
      return ${obj[prop].check}`
            const funced = new Function(check)
            const result = funced()

            return result
          },
          featureProxy,
          [prop, ...args]
        )
    },
    set: () => {
      throw new Error('Not allowed to set a value')
    }
  })

  return featureProxy
}
