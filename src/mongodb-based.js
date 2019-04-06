const proxy = require('./proxy')
const mongo = () => {}

module.exports = async config => {
  const db = mongo(config)
  const features = await db.features.find({})
  return proxy(features)
}
