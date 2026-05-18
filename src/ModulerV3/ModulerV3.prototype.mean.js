(options) {
  this._trace("mean", arguments, 1);
  this.assert(typeof options === "object", "required «options» as object on ModulerV3.prototype.mean");
  const definition = options instanceof ModulerV3.Definition ? options : await this.define(options);
  const meaning = await this._loadDefinition(definition);
  return meaning;
  Si_es_string:
  if (typeof options === "id") {
    Devolver_cacheado_si_escaece:
    if (id in this.modules) {
      return this.modules[id].promise;
    }
  }
  let record = undefined;
  Registrar_modulo_al_inicio: {
    record = {
      exports: {},
      promise: null,
    };
    this.modules[id] = record;
  }
  Iniciar_promesa: {
    record.promise = (async () => {
      const factory = await this.resolveDefinitionById(id);
      const output = await factory(record.exports);
      return record.exports;
    })();
  }
  Devolver_promesa: {
    return record.promise;
  }
}