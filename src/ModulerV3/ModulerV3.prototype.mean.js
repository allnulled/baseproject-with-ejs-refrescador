(options) {
  this._trace("mean", arguments, 1);
  const definition = await this.define(options);
  return await this._loadDefinition(definition);
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