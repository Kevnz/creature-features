describe('Feature based on rules', () => {
  it('should when passed a parameter evaluate the rule and return true or false', () => {
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/rules'
    });

    expect(locationFeatures.EmailBasedFeature('test@example.com')).toBe(true);
    expect(locationFeatures.EmailBasedFeature('nope@example.com')).toBe(false);
  });

  it('should when passed an object evaluate the rule and return true or false', () => {
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/rules'
    });

    expect(
      locationFeatures.ObjectPassedFeature({
        email: 'test@example.com',
        role: 'admin'
      })
    ).toBe(true);
    expect(
      locationFeatures.ObjectPassedFeature({
        email: 'nope@example.com',
        role: 'user'
      })
    ).toBe(false);
  });

  it('should when passed an object evaluate the rule and return false if missing parameters', () => {
    const creature = require('../index');
    const locationFeatures = creature({
      location: './test/features/rules'
    });

    expect(
      locationFeatures.ObjectPassedFeature({
        email: 'test@example.com',
        role: 'admin'
      })
    ).toBe(true);

    expect(
      locationFeatures.ObjectPassedFeature({
        email: 'nope@example.com',
        role: 'user'
      })
    ).toBe(false);
  });
});
