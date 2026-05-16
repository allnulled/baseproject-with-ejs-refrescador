async function() {
  //@doc El Registration.prototype.commit tiene 3 pasos:
  //@doc Paso 1. _lockProcess: bloquea el proceso de registro
  await this._lockProcess();
  //@doc Paso 2. _validateDefineOptions: valida las opciones iniciales del registro
  this._tagType();
  this._validateType();
  this._validateNontype();
  //@doc Paso 3. _registerDefinition: registra la definición
  await this._registerDefinition();
}