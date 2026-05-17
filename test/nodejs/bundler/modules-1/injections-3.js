return inject.source("c.js", {
  x: 123,
  nested: {
    arr: [
      { a: 1 },
      { b: ")" }
    ]
  }
});