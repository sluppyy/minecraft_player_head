const formatter = Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
function time() {
  return formatter.format(new Date());
}

module.exports = {
  info(string) {
    console.log(`[${time()}] ${string}`);
  },

  warn(string) {
    console.warn(`[${time()}] \x1b[33m${string}\x1b[0m`);
  },

  error(string) {
    console.warn(`[${time()}] \x1b[31m${string}\x1b[0m`);
  },
};
