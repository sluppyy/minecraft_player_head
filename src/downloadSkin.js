const sharp = require('sharp')
const imgCache = require('./imgCache')
const cache = require('./cache')
const api = require('./api')

function getUUID(username) {
  return cache(`uuid-${username}`, () => api.getUserId(username))
}

async function getUrl(username) {
  const uuid = await getUUID(username)
  return api.getSkinUrl(uuid)
}

function getSourceBuffer(username) {
  return imgCache(`source-${username}.png`, async () => {
    const url = await getUrl(username)
    return api.getImage(url)
  })
}

module.exports = async function(username) {
  const head = await imgCache(`head-${username}.png`, async () => {
    const sourceBuffer = await getSourceBuffer(username)
    try {
      return sharp(sourceBuffer).extract({ 
        left: 8, 
        top: 8, 
        width: 8, 
        height: 8 
      }).toBuffer()
    } catch (error) {
      console.error(error)
    }
  })

  return head
}