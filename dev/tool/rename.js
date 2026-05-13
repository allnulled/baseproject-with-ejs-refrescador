/*
module.exports = function(args = []) {
  const fs = require("fs");
  const path = require("path");
  const projectRoot = path.resolve(__dirname, "..", "..");
  const packageJson = require(`${projectRoot}/package.json`);
  console.log(`In: ${packageJson.name}@${packageJson.version}`);
  const [ origen, destino ] = args;
  console.log("Renaming:")
  console.log("  from   " + origen);
  console.log("  to:    " + destino);
  const ignoredSubpaths = ["node_modules","dist","dev"];
  // @TODO: hacer que:
  //   - Si el path contiene los ignoredSubpaths, se ignora
  //   - Cualquier string de file.content que tenga el «origen»
  //   - Y cualquier string de file.name que tenga el «origen»
  //   - Se reemplace en todos los lugares por el «from»
};
//*/

module.exports = function(args = []) {
  throw new Error("Es un comando peligroso y con el que algún día te enfadarías mucho");
  const fs = require("fs");
  const path = require("path");
  const projectRoot = path.resolve(__dirname, "..", "..");
  const packageJson = require(`${projectRoot}/package.json`);
  console.log(`In: ${packageJson.name}@${packageJson.version}`);
  const [origen, destino] = args;
  console.log("Renaming:");
  console.log("  from: " + origen);
  console.log("  to:   " + destino);

  const ignoredSubpaths = [
    "node_modules",
    "dist",
    "dev",
    ".git"
  ];

  function isIgnored(filepath) {
    return ignoredSubpaths.some(subpath => {
      return filepath.includes(path.sep + subpath + path.sep)
        || filepath.endsWith(path.sep + subpath)
        || filepath.startsWith(subpath + path.sep);
    });
  }

  function replaceInFile(filepath) {
    let content;
    try {
      content = fs.readFileSync(filepath, "utf8");
    } catch(error) {
      return;
    }
    if(content.includes(origen)) {
      const updated = content.split(origen).join(destino);
      fs.writeFileSync(filepath, updated, "utf8");
      console.log("updated file:", filepath);
    }
  }

  function renamePath(filepath) {
    const dirname = path.dirname(filepath);
    const basename = path.basename(filepath);
    if(!basename.includes(origen)) {
      return filepath;
    }
    const renamedBasename = basename.split(origen).join(destino);
    const renamedPath = path.join(dirname, renamedBasename);
    fs.renameSync(filepath, renamedPath);
    console.log("renamed:", filepath);
    console.log("       ->", renamedPath);
    return renamedPath;
  }
  function walk(currentPath) {
    if(isIgnored(currentPath)) {
      return;
    }
    const stat = fs.statSync(currentPath);
    if(stat.isDirectory()) {
      let children = fs.readdirSync(currentPath);
      for(const child of children) {
        const childPath = path.join(currentPath, child);
        walk(childPath);
      }
      // IMPORTANTE:
      // renombrar carpetas DESPUÉS
      // de recorrerlas
      renamePath(currentPath);
      return;
    }
    if(stat.isFile()) {
      replaceInFile(currentPath);
      renamePath(currentPath);
    }
  }
  walk(projectRoot);
  console.log("Done.");
};