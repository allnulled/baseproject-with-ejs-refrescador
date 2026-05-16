class ModulerV3Definition {
  static create = <%-await inc("src/common/common.static.create.js")%>
  <%-await inc("src/ModulerV3/Definition.constructor.js")%>
}