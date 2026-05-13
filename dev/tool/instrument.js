const fs = require("fs/promises");
const path = require("path");
const NYC = require("nyc");

module.exports = async function main(extra) {
    const nyc = new NYC({
      cwd: process.cwd(),
      tempDirectory: ".nyc_output",
      ...extra
    });
    await nyc.instrumentAllFiles("dist", "dev/coverage/dist");
    console.log(" 🎷 Successfully instrumented files");
};