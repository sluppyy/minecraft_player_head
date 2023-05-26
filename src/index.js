const { parse } = require('dotenv')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const env = parse(readFileSync(resolve(process.cwd(), '.env.local')).toString('utf-8'))

const app = require('express')()



app.listen(env['PORT'], () => {
  console.log(`App start on port ${env['PORT']}`)
})