function (basedirInput = null, file = "looper.settings.js") {
  if(this.projectRoot) {
    return this.projectRoot;
  }
  let basedir = basedirInput;
  if(typeof basedirInput === "string") {
    basedir = basedirInput;
  } else if(basedirInput === null) {
    if(this.basedir) {
      basedir = this.basedir;
    } else {
      basedir = process.cwd();
    }
  }
  const fs = require("fs");
  const path = require("path");
  let dir = basedir;
  let previousDir = null;
  do {
    try {
      const filepath = path.resolve(dir, file);
      fs.readFileSync(filepath);
      this.projectRoot = dir;
      return dir;
    } catch (error) {
      previousDir = dir;
      dir = path.dirname(dir);
    }
  } while (dir !== previousDir);
  return null;
};