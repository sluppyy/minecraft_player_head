const { env } = require('./env')
const downloadSkin = require('./downloadSkin')
const logger = require('./logger')
const fs = require('fs/promises')

const app = require('express')()

app.get('/:username', async (req, res) => {
  const username = req.params.username
  try {
    const buffer = await downloadSkin(username)
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length
    })
    res.end(buffer)  
  } catch (error) {
    logger.error(error)
    res.status(500)
    res.send('internal error')
  }
})

app.listen(env['PORT'], () => {
  console.log(`App start on port ${env['PORT']}`)
})