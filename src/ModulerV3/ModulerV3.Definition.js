class {
  <%-await inc("src/ModulerV3/ModulerV3.Definition.constructor.js")%>
  assert = <%-await inc("src/common/common.assert.js", { owner: "ModuleV3.Definition" })%>;
  _lockProcess = <%-await inc("src/ModulerV3/ModulerV3.Definition.prototype._lockProcess.js")%>;
  _validateDefineOptions = <%-await inc("src/ModulerV3/ModulerV3.Definition.prototype._validateDefineOptions.js")%>;
  _registerDefinition = <%-await inc("src/ModulerV3/ModulerV3.Definition.prototype._registerDefinition.js")%>;
}