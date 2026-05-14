class ModulerV3Definition {
  <%-await inc("src/ModulerV3/Definition.constructor.js")%>
  assert = <%-await inc("src/common/common.assert.js", { owner: "ModuleV3.Definition" })%>;
}