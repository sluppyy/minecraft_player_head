const sharp = require("sharp");
const imgCache = require("./imgCache");
const api = require("./api");

async function getUUID(username) {
  return await api.getUserId(username);
}

async function getUrl(username) {
  const uuid = await getUUID(username);
  return api.getSkinUrl(uuid);
}

async function getSourceBuffer(username) {
  const url = await getUrl(username);
  return api.getImage(url);
}

module.exports = async function (username) {
  const head = await imgCache(`head-${username}.png`, async () => {
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
      console.error(error);
    }
  });

  return head;
};
