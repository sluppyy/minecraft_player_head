const sharp = require('sharp')
const imgCache = require('./imgCache')
const api = require('./api')

module.exports = async function(username) {
  const head = await imgCache(`head-${username}.png`, async () => {
    const sourceBuffer = await imgCache(`source-${username}.png`, async () => {
      return 
    })

    return sharp(sourceBuffer).extract({ 
      left: 8, 
      top: 8, 
      width: 8, 
      height: 8 
    }).toBuffer()
  })

  return head
}