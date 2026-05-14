module.exports = async function({ PathLocator, DevUtils }) {
  const projectRoot = await DevUtils.findProjectRoot();
  
  const pather0 = PathLocator.create();
  pather0.assert(pather0.basedir === process.cwd(), "default basedir should be cwd");

  const pather1 = PathLocator.create(projectRoot);
  const path1 = pather1.absolute("src/Colors/Colors.entry.js");
  const path2 = pather1.relative("src/Colors/Colors.entry.js");
  pather1.assert(path1.startsWith(projectRoot), "PathLocator.absolute está fallando (punto 1)");
  pather1.assert(path1.endsWith("src/Colors/Colors.entry.js"), "PathLocator.absolute está fallando (punto 2)");
  pather1.assert(!path2.startsWith(projectRoot), "PathLocator.relative está fallando (punto 1)");
  pather1.assert(path2.endsWith("src/Colors/Colors.entry.js"), "PathLocator.relative está fallando (punto 2)");

};