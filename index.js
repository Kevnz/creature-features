const path = require('path')
const fs = require('fs')
const debug = require('debug')('Creature-Features')
const endWith = require('end-with')
const random = require('random-weighted')
const exists = fs.existsSync

module.exports = function (config) {
  let env
  let featuresFile
  let baseFeatures
  let defaults = {
    location: path.join(process.cwd(), './features/'),
  }

  const settings = Object.assign({}, defaults, config)
  if (arguments.length === 0) {
    env = process.env.NODE_ENV || 'development'
  } else {
    if (typeof config === 'string') {
      env = config
    } else {
      env = config.env ? config.env : process.env.NODE_ENV
    }
  }

  featuresFile = `${
    endWith(settings.location, '/')
      ? settings.location
      : settings.location + '/'
  }${env}.json`
  baseFeatures = `${
    endWith(settings.location, '/')
      ? settings.location
      : settings.location + '/'
  }default.json`

  var featuresFiles = []
  featuresFiles.push(baseFeatures)
  if (typeof featuresFile === 'string' && exists(featuresFile)) {
    featuresFiles.push(featuresFile)
  }

  if (env === 'development') {
    // look for a "named" development file
    const files = fs.readdirSync(path.join(process.cwd(), './features'))
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].indexOf('development.') > -1 &&
        files[i] !== 'development.json'
      ) {
        featuresFiles.push(path.join(process.cwd(), './features/' + files[i]))
      }
    }
  }

  const requiredFeatures = featuresFiles
    .filter((f) => exists(f))
    .map(function (file) {
      return require(file)
    })

  const feats = requiredFeatures.reduce((prev, current) => {
    return { ...prev, ...current }
  }, {})
  const featureProxy = new Proxy(feats, {
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
        const range = obj[prop].range.map((v) => v / 100)
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
    },
  })

  return featureProxy
}
