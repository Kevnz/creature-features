const weighted = require('weighted');
const creature = require('./index');
// will need to use the ctor
const features = creature();
// features currently from file.

let scales = {
  get: function(obj, prop) {

    if (features[prop] === true) return true;
    if (features[prop] === false) return false;

    const weight = features[prop].weight;
    const options = [true, false];
    const weights = [weight, 1 - weight];
    return weighted.select(options, weights);
  }
};


module.exports = new Proxy({}, scales);