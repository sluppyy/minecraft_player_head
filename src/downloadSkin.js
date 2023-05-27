const sharp = require("sharp");
const cache = require("./cache");
const api = require("./api");
const logger = require("./logger");

async function getUUID(username) {
  return await api.getUserId(username);
}

async function getUrl(username) {
  const uuid = await getUUID(username);
  return api.getSkinUrl(uuid);
}

async function getSourceBuffer(username) {
  const url = await getUrl(username);
  const img = await api.getImage(url);
  return img;
}

module.exports = async function (username) {
  const head = await cache(`${username}.png`, async () => {
    const sourceBuffer = await getSourceBuffer(username);

    try {
      return sharp(sourceBuffer)
        .extract({
          left: 8,
          top: 8,
          width: 8,
          height: 8,
        })
        .toBuffer();
    } catch (error) {
      logger.error(error);
    }
  });

  return head;
};
