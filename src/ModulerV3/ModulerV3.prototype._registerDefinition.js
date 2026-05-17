(definition) {
  const ids = [];
  Registrar_definicion_por_tipo_si_escaece: {
    if (["path", "file", "url"].includes(definition.$type)) {
      const id = `${definition.$type}://${definition[definition.$type]}`;
      if(id in this.definitions) throw new Error(`duplicated module id «${id}»`);
      this.definitions[id] = definition;
      ids.push(id);
    }
  }
  Registrar_definicion_por_name_si_escaece: {
    if (typeof definition.as === "string") {
      const id = `name://${definition.as}`;
      if(id in this.definitions) throw new Error(`duplicated module id «${id}»`);
      this.definitions[id] = definition;
      ids.push(id);
    }
  }
  if(ids.length) {
    definition.$ids = ids;
  }
  return definition;
}