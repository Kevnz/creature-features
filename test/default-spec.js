const test = require('ava');

test('Load features from default location', (t) => {
  process.env.NODE_ENV = null;
  const creature = require('../index');
  const features = creature();
  t.plan(3);
  t.true(features.FirstFeature);
  t.true(!features.DefaultOverride);
  t.true(!features.IsTest);
  process.env.NODE_ENV = null;
});

test('Load named development features', (t) => {
  process.env.NODE_ENV = 'development';
  const creature = require('../index');
  const namedFeatures = creature('development');
  t.plan(1);
  t.true(namedFeatures.IsNamed);
  process.env.NODE_ENV = null;
});
test('Load features with a custom env', (t) => {
  process.env.NODE_ENV = 'test';
  const creature = require('../index');
  const envFeatures = creature('development')
  t.plan(3);
  t.true(envFeatures.FirstFeature);
  t.true(envFeatures.IsDevelopment);
  t.true(envFeatures.IsTest === false);
  process.env.NODE_ENV = null;
});

test('Load features with a custom env that does not have a feature file', (t) => {
  process.env.NODE_ENV = 'stable';
  const creature = require('../index');
  const envFeatures = creature()
  t.plan(2);
  t.true(envFeatures.FirstFeature);
  t.true(envFeatures.DefaultOverride === false);
  process.env.NODE_ENV = null;
});
test('Load features from a custom location', (t) => {
  process.env.NODE_ENV = 'development';
  const creature = require('../index');
  const locationFeatures = creature({
    location: './test/features/'
  });
  t.plan(3);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.LocationIsTest);
  t.true(locationFeatures.DefaultLocation === undefined);
  process.env.NODE_ENV = null;
});

test('Load features from a custom location and a custom environment', (t) => {
  process.env.NODE_ENV = 'test';
  const creature = require('../index');
  const locationFeatures = creature({
    location: './test/features/',
    env: 'development'
  });
  t.plan(2);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.DevelopmentFeature);
  process.env.NODE_ENV = null;
});
test('Load features from a custom location without trailing slash', (t) => {
  process.env.NODE_ENV = 'development';
  const creature = require('../index');
  const locationFeatures = creature({
    location: './test/features'
  });
  t.plan(3);
  t.true(locationFeatures.Location);
  t.true(locationFeatures.LocationIsTest);
  t.true(locationFeatures.DefaultLocation === undefined);
  process.env.NODE_ENV = null;
});
