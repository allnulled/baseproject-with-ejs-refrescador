(definition, source) {
  if(this.settings.saveSources === true) {
    definition.$source = source;
  }
  this._tagDefinitionEndedAt(definition);
}