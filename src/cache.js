const fs = require("fs/promises");
const { resolve } = require("path");

const cachePath = resolve(process.cwd(), "cache");

/**
 * @param {string} key
 * @param {() => Promise<string>} f
 * @returns {Promise<string>}
 */
module.exports = async function (key, f) {
  const path = resolve(cachePath, key);
  try {
    return await fs.readFile(path, { encoding: "utf-8" });
  } catch (e) {
    const data = await f();
    await fs.writeFile(path, data);
    return data;
  }
};

/**
 * @param {string} key
 */
module.exports.invalidate = async function (key) {
  await fs.rm(resolve(cachePath, key));
};
