module.exports = async function({ PathLocator }) {
  const projectRoot = require("path").resolve(__dirname + "/../../..");
  const pather = PathLocator.create(projectRoot);
  const path1 = pather.absolute("src/Colors/Colors.entry.js");
  const path2 = pather.relative("src/Colors/Colors.entry.js");
  pather.assert(path1.startsWith(projectRoot), "PathLocator.absolute está fallando (punto 1)");
  pather.assert(path1.endsWith("src/Colors/Colors.entry.js"), "PathLocator.absolute está fallando (punto 2)");
  pather.assert(!path2.startsWith(projectRoot), "PathLocator.relative está fallando (punto 1)");
  pather.assert(path2.endsWith("src/Colors/Colors.entry.js"), "PathLocator.relative está fallando (punto 2)");
};