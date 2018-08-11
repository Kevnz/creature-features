const test = require('ava');

test('Load features from default location', (t) => {
  const creature = require('../src/index');
  const features = creature();
  t.plan(10);
  t.true(features.FirstFeature());
  t.true(!features.DefaultOverride());
  t.true(!features.IsTest());
  // features should be % based
});