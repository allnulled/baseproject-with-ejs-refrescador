module.exports = async function() {
  await require("timers/promises").setTimeout(1);
  return 400;
};