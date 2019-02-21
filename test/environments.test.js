describe('The Default Behavior of the Module', () => {
  beforeAll(() => {
    process.env.NODE_ENV = null
    delete process.env.NODE_ENV
  })

  it('should load named the development features when the NODE_ENV is set to "development"', () => {
    process.env.NODE_ENV = 'development'
    const creature = require('../index')
    const namedFeatures = creature()
    expect(namedFeatures.IsNamed).toBe(true)
    expect(namedFeatures.IsDevelopmentFromDefault).toBe(true)
    expect(namedFeatures.IsDevelopment).toBe(true)
  })

  it('should load features with a custom env when a different NODE_ENV is already set', () => {
    process.env.NODE_ENV = 'test'
    const creature = require('../index')
    const envFeatures = creature('development')
    expect(envFeatures.FirstFeature).toBe(true)
    expect(envFeatures.IsDevelopment).toBe(true)
    expect(envFeatures.IsDevelopmentFromDefault).toBe(true)
    expect(envFeatures.IsTest).toBe(false)
  })

  it('should load features with a production env that does have a feature file', () => {
    process.env.NODE_ENV = 'production'
    const creature = require('../index')
    const envFeatures = creature()

    expect(envFeatures.IsTest).toBe(false)
    expect(envFeatures.IsProduction).toBe(true)
    expect(envFeatures.IsCustomLocation).toBe(false)
  })

  it('should load features from a custom location and a custom environment based on NODE_ENV setting', () => {
    process.env.NODE_ENV = 'production'
    const creature = require('../index')
    const locationFeatures = creature({
      location: './test/features/'
    })

    expect(locationFeatures.Location).toBe(true)
    expect(locationFeatures.IsTest).toBe(false)
    expect(locationFeatures.IsCustomLocation).toBe(true)
  })
})
