const proxy = require('./proxy')
const Knex = () => {}

module.exports = async config => {
  const knex = Knex(config)
  const features = await knex.select().table('features')

  return proxy(features)
}
