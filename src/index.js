const path = require('path');
const fs = require('fs');
const endWith = require('end-with');
const exists = require('file-exists');
module.exports = function (config) {
  let env, featuresFile, baseFeatures, overrides, locationBase = './features/';
  if (arguments.length === 0) {
    env = process.env.NODE_ENV || 'development';
  } else {
    if (typeof config ==='string'){
      env = config
    } else { //config is believed to be an object
      env = config.env ? config.env : process.env.NODE_ENV;
      overrides = config;
      delete overrides.env;
      if (overrides.location) {
        locationBase = endWith(overrides.location, '/') ? overrides.location : overrides.location + '/';
      }
    }
  }

  featuresFile = `${locationBase}${env}.json`;
  baseFeatures = `${locationBase}default.json`;

  const featuresFiles = [];
  featuresFiles.push(baseFeatures);
  if (typeof featuresFile === 'string' && exists.sync(featuresFile)) {
    featuresFiles.push(featuresFile);
  }

  if (env === 'development') {
    // look for a "named" development file
    const files = fs.readdirSync(path.join( process.cwd(), './features'));
    for (var i = 0; i < files.length; i++) {
      if(files[i].indexOf('development.') > -1 && files[i] !== 'development.json') {
        featuresFiles.push('./features/'+ files[i]);
      }
    };
  }

  const requiredFeatures = featuresFiles.map((file) => require(file));
  return Object.assign(...requiredFeatures);
}
