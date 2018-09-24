# Creature Features
## Dead simple feature flags for node.js

### Install
```bash
npm install creature-features --save
```
### Configure
#### directory and files
```
- features
-- default.json (default settings)
-- development.json (settings for development environment)
-- development.{named}.json (settings for individual development environment)
-- test.json (settings for test)
-- production.json (settigns for production)
-- {any other environment}.json
```
#### Example File
```json
{
	"FeatureOne": true,
	"FeatureTwo": true,
	"FeatureThree": false
}
```

### Usage
```javascript
const features = require('creature-features')();
// Default behavior
if (features.FeatureOne) {
// do something new
} else {
// do the old thing
}
```
#### Rules Based
```json
{
	"FeatureOne": true,
  "FeatureTwo": true,
  "RuleForEmailFeature": {
    "parameters": "email",
    "check": "email.indexOf('test') > -1"
  },
	"RuleForEmailAndRoleFeature": {
    "parameters": "email,role",
    "check": "email.indexOf('test') > -1 && role ==='admin'"
  }
}
```
```javascript
const features = require('creature-features')();
// Default behavior
if (features.RuleForEmailFeature(user.email)) {
// do something new
} else {
// do the old thing
}
if (features.RuleForEmailAndRoleFeature({ email: user.email, role: user.account.role })) {
// do something new
} else {
// do the old thing
}
```

#### Weight Based
```json
{
	"FeatureOne": true,
  "FeatureTwo": true,
  "PercentBasedFiftyFifty": {
    "range": [50, 50]
  },
  "PercentBasedOneThird": {
    "range": [33, 67]
  },
}
```

```javascript
const features = require('creature-features')();
// Roughly 50% of the the time this will be true
if (features.PercentBasedFiftyFifty) {
// do something new
}
// Roughly 33% of the the time this will be true
if (features.PercentBasedOneThird) {
// do something new
}
```

### In Webpack
```javascript
const features = require('creature-features')();
const webpack = require('webpack');

const featureFlags = new webpack.DefinePlugin({
  FEATURES: features
});

module.exports = {
  plugins: [featureFlags],
  ...

// in a ui file
if (FEATURES.FeatureOne)
```
### Why?
* [They are useful](http://code.flickr.net/2009/12/02/flipping-out/)
* [More info](http://featureflags.io/)

### Advanced Usage
```javascript
const creature = require('creature-features');
const prodFeatures = creature('production');
const locationFeatures = creature({location: './my-location/for-features'});
const bothFeatures = creature({location: './my-location/for-features', env: 'staging'});

```
