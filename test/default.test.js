describe('The Default Behavior of the Module', () => {
  beforeAll(() => {
    process.env.NODE_ENV = null;
    delete process.env.NODE_ENV;
  });

  it('Load default features', () => {
    const creature = require('../index');
    const features = creature();
    expect(features.FirstFeature).toBe(true);
    expect(features.DefaultOverride).toBe(false);
    expect(features.IsTest).toBe(false);
  });

  it('should load named development features', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const namedFeatures = creature('development');
    expect(namedFeatures.IsNamed).toBe(true);
  });

  it('should load features with a custom environment passed', () => {
    process.env.NODE_ENV = 'test';
    const creature = require('../index');
    const envFeatures = creature('development');
    expect(envFeatures.FirstFeature).toBe(true);
    expect(envFeatures.IsDevelopment).toBe(true);
    expect(envFeatures.IsTest).toBe(false);
  });

  it('should load features with a custom env that does not have a feature file', () => {
    process.env.NODE_ENV = 'stable';
    const creature = require('../index');
    const envFeatures = creature();

    expect(envFeatures.FirstFeature).toBe(true);
    expect(envFeatures.DefaultOverride).toBe(false);
  });

  it('should load features from a custom location and the NODE_ENV has been set', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/'
    });
    expect(locationFeatures.Location).toBe(true);
    expect(locationFeatures.LocationIsTest).toBe(true);
    expect(() => {
      locationFeatures.DefaultLocation;
    }).toThrow();
  });

  it('should load features from a custom location no slash and the NODE_ENV has been set', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features'
    });
    expect(locationFeatures.Location).toBe(true);
    expect(locationFeatures.LocationIsTest).toBe(true);
    expect(() => {
      locationFeatures.DefaultLocation;
    }).toThrow();
  });

  it('should load features from a custom location and a custom environment config object', () => {
    process.env.NODE_ENV = 'test';
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/',
      env: 'development'
    });

    expect(locationFeatures.Location).toBe(true);
    expect(locationFeatures.DevelopmentFeature).toBe(true);
  });

  it('should load features from a config object with custom location without trailing slash', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features'
    });
    expect(locationFeatures.Location).toBe(true);
    expect(locationFeatures.LocationIsTest).toBe(true);
    expect(() => {
      locationFeatures.DefaultLocation;
    }).toThrow();
  });

  it('should load features from a custom location with a trailing slash', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/'
    });
    expect(locationFeatures.Location).toBe(true);
    expect(locationFeatures.LocationIsTest).toBe(true);
    expect(() => {
      locationFeatures.DefaultLocation;
    }).toThrow();
  });

  it('should throw an error when trying to set a feature', () => {
    process.env.NODE_ENV = 'development';
    const creature = require('../index');
    const locationFeatures = creature();

    expect(() => {
      locationFeatures.FirstFeature = true;
    }).toThrow();
  });
});
