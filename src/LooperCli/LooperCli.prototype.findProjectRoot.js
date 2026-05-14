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
  return this.constructor.findClosestWithFile(basedir, file);
};