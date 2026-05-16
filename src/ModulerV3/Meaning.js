class {
  static assert<%-await inc("src/common/common.assert.js", { owner: "Meaning" })%>;
  static of<%-await inc("src/ModulerV3/Meaning.of.js")%>;
}