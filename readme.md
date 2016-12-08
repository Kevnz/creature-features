# Creature Features
## Dead simple feature flags
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

if (features.FeatureOne) {
// do something new
} else {
// do the old thing
}
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