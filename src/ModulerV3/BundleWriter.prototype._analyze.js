(options) {
  this._trace("prototype._analyze");
  // Reset analysis:
  this._analysis = {
    js: {
      output: "",
      blocks: [],
    },
  };
  // Get definitions by order:
  const allBlocks = this._analysis.js.blocks = Object.values(this.moduler.definitions).sort(function(a,b) {
    return a.$order <= b.$order ? -1 : 1;
  });
  let js = "";
  for(let indexBlock=0; indexBlock<allBlocks.length; indexBlock++) {
    js += this._wrapInAsyncCall(allBlocks[indexBlock].$source);
  }
  this._analysis.js.output = this._beautify(js);
  
}