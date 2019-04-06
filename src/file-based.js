const path = require('path')
const fs = require('fs')
const debug = require('debug')('Creature-Features')
const endWith = require('end-with')
const random = require('random-weighted')
const exists = fs.existsSync
const proxy = require('./proxy')
module.exports = function(config) {
  let env
  let featuresFile
  let baseFeatures
  let defaults = {
    location: path.resolve(process.cwd(), './features/')
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
  featuresFiles.push(path.resolve(process.cwd(), baseFeatures))
  if (typeof featuresFile === 'string' && exists(featuresFile)) {
    featuresFiles.push(path.resolve(process.cwd(), featuresFile))
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
    .filter(f => exists(f))
    .map(function(file) {
      return require(file)
    })

  const feats = requiredFeatures.reduce((prev, current) => {
    return { ...prev, ...current }
  }, {})

  return proxy(feats)
}
