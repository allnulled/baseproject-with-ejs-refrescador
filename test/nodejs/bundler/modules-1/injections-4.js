/* @inject.source("d.js") */
/* @inject.source("e.js", {
  x: 123,
  nested: {
    arr: [
      { a: 1 },
      { b: ")" }
    ]
  }
}) */
return inject.source("f.js", {
  x: 123,
  nested: {
    arr: [
      { a: 1 },
      { b: ")" }
    ]
  }
});