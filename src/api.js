const { default: axios } = require("axios");
const logger = require("./logger");

/**
 * @param {string} username
 * @return {Promise<string>}
 */
module.exports.getUserId = async function (username) {
  logger.info(`Get id for ${username}`);
  return (
    await axios.get(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    )
  ).data.id;
};

/**
 * @param {string} uuid
 * @return {Promise<string>}
 */
module.exports.getSkinUrl = async function (uuid) {
  logger.info(`Get skin url for ${uuid}`);
  const string = (
    await axios.get(
      `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
    )
  ).data.properties[0].value;
  const decoded = Buffer.from(string, "base64").toString("utf-8");
  const parsed = JSON.parse(decoded);
  return parsed.textures.SKIN.url;
};

/**
 * @param {string} url
 * @return {Promise<Buffer>}
 */
module.exports.getImage = async function (url) {
  logger.info(`Download image ${url}`);
  const img = (
    await axios.get(url, {
      responseType: "arraybuffer",
    })
  ).data;
  return Buffer.from(img, "binary");
};
