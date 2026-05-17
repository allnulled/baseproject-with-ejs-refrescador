(subpath) {
  return require("fs/promises").readFile(this.fullpath(subpath), "utf8");
}