const creature = require('../index');
const features = creature();

const test = require('ava');

test('Load features from default location', (t) => {
  t.plan(3);
  t.true(features.FirstFeature);
  t.true(features.DefaultOverride);
  t.true(features.IsTest);
});

test('Load named development features', (t) => {
  const namedFeatures = creature('development');
  t.plan(1);
  t.true(namedFeatures.IsNamed);
});
test('Load features with a custom env', (t) => {
  const envFeatures = creature('development')
  t.plan(3);
  t.true(envFeatures.FirstFeature);
  t.true(envFeatures.IsDevelopment);
  t.true(envFeatures.IsTest === false);
});

test('Load features from a custom location', (t) => {
  const locationFeatures = creature({
    location: './test/features/'
  });
  t.plan(3);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.LocationIsTest);
  t.true(locationFeatures.DefaultLocation === undefined);
});

test('Load features from a custom location and a custom environment', (t) => {
  const locationFeatures = creature({
    location: './test/features/',
    env: 'development'
  });
  t.plan(2);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.DevelopmentFeature);
});
test('Load features from a custom location without trailing slash', (t) => {
  const locationFeatures = creature({
    location: './test/features'
  });
  t.plan(3);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.LocationIsTest);
  t.true(locationFeatures.DefaultLocation === undefined);
});
