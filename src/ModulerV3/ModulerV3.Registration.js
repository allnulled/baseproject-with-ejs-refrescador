class {
  <%-await inc("src/ModulerV3/ModulerV3.Registration.constructor.js")%>
  assert = <%-await inc("src/common/common.assert.js", { owner: "ModuleV3.Registration" })%>;
  commit = <%-await inc("src/ModulerV3/ModulerV3.Registration.prototype.commit.js")%>;
  _lockProcess = <%-await inc("src/ModulerV3/ModulerV3.Registration.prototype._lockProcess.js")%>;
  _validateDefineOptions = <%-await inc("src/ModulerV3/ModulerV3.Registration.prototype._validateDefineOptions.js")%>;
  _registerDefinition = <%-await inc("src/ModulerV3/ModulerV3.Registration.prototype._registerDefinition.js")%>;
}