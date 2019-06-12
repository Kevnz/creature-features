const fs = require('fs')
const path = require('path')

console.warn('Creating folder and feature files')

const featureDir = path.join(process.cwd(), 'features')

if (!fs.existsSync(featureDir)) {
  fs.mkdirSync(featureDir)

  fs.writeFileSync(
    path.join(featureDir, 'config.json'),
    JSON.stringify({}),
    'utf8'
  )
  fs.writeFileSync(
    path.join(featureDir, 'config.development.json'),
    JSON.stringify({}),
    'utf8'
  )

  fs.writeFileSync(
    path.join(featureDir, 'config.test.json'),
    JSON.stringify({}),
    'utf8'
  )

  fs.writeFileSync(
    path.join(featureDir, 'config.production.json'),
    JSON.stringify({}),
    'utf8'
  )

  console.info(`Feature files created in ${featureDir}`)
} else {
  console.warn(`${featureDir} already exists`)
}
