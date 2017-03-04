'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = require('path');
var fs = require('fs');
var endWith = require('end-with');
var exists = require('file-exists');
module.exports = function (config) {
  var env = void 0,
      featuresFile = void 0,
      baseFeatures = void 0,
      overrides = void 0,
      locationBase = './features/';
  if (arguments.length === 0) {
    env = process.env.NODE_ENV || 'development';
  } else {
    if (typeof config === 'string') {
      env = config;
    } else {
      //config is believed to be an object
      env = config.env ? config.env : process.env.NODE_ENV;
      overrides = config;
      delete overrides.env;
      if (overrides.location) {
        locationBase = endWith(overrides.location, '/') ? overrides.location : overrides.location + '/';
      }
    }
  }

  featuresFile = '' + locationBase + env + '.json';
  baseFeatures = locationBase + 'default.json';

  var featuresFiles = [];
  featuresFiles.push(baseFeatures);
  if (typeof featuresFile === 'string' && exists.sync(featuresFile)) {
    featuresFiles.push(featuresFile);
  }

  if (env === 'development') {
    // look for a "named" development file
    var files = fs.readdirSync(path.join(process.cwd(), './features'));
    for (var i = 0; i < files.length; i++) {
      if (files[i].indexOf('development.') > -1 && files[i] !== 'development.json') {
        featuresFiles.push('./features/' + files[i]);
      }
    };
  }

  var requiredFeatures = featuresFiles.map(function (file) {
    return require(file);
  });
  return Object.assign.apply(Object, _toConsumableArray(requiredFeatures));
};