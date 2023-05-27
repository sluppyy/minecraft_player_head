const fs = require("fs/promises");
const { resolve } = require("path");

const cachePath = resolve(process.cwd(), "images");

/**
 * @param {string} name
 * @param {() => Promise<Buffer>} f
 * @returns {Promise<Buffer>}
 */
module.exports = async function (name, f) {
  const path = resolve(cachePath, name);
  try {
    return await fs.readFile(path);
  } catch (e) {
    const data = await f();
    await fs.writeFile(path, data);
    return fs.readFile(path);
  }
};
