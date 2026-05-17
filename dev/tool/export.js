module.exports = async function (files = process.argv.splice(2)) {
  const fs = require("fs");
  const path = require("path");
  const DevUtils = require(__dirname + "/../dev-utils.js");
  const { projectRoot, abs, relativ, settings } = DevUtils;
  Iterating_origins:
  for(let origin in settings.exportations) {
    if(origin.startsWith("!")) continue Iterating_origins;
    const destinations = settings.exportations[origin];
    for(let index=0; index<destinations.length; index++) {
      const destination = destinations[index];
      await fs.promises.copyFile(abs(origin), abs(destination));
      console.log(` 🚛 Exported: «${destination}»`);
    }
  }
};
