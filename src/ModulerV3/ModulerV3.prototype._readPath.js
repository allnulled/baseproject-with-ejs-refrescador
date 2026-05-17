(subpath) {
  if(this.settings.pathMode === "file") {
    return this._readFile(subpath);
  } else if(this.settings.pathMode === "url") {
    return this._readUrl(subpath);
  } else if(typeof require === "function") {
    return this._readFile(subpath);
  }
  return this._readUrl(subpath);
}