const { parse } = require('dotenv')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const env = parse(readFileSync(resolve(process.cwd(), '.env.local')).toString('utf-8'))

module.exports = {
  env
}