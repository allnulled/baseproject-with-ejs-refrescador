class ModulerV3Registration {
  static create = <%-await inc("src/common/common.static.create.js")%>
  <%-await inc("src/ModulerV3/Registration.constructor.js")%>
  assert<%-await inc("src/common/common.assert.js", { owner: "ModuleV3.Registration" })%>;
  commit = <%-await inc("src/ModulerV3/Registration.prototype.commit.js")%>;
  _lockProcess<%-await inc("src/ModulerV3/Registration.prototype._lockProcess.js")%>;
  _tagType<%-await inc("src/ModulerV3/Registration.prototype._tagType.js")%>;
  _validateType<%-await inc("src/ModulerV3/Registration.prototype._validateType.js")%>;
  _validateNontype<%-await inc("src/ModulerV3/Registration.prototype._validateNontype.js")%>;
  _registerDefinition<%-await inc("src/ModulerV3/Registration.prototype._registerDefinition.js")%>;
}