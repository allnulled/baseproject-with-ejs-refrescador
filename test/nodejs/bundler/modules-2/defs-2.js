return define({
  name: "two",
  uses: [{ name: "one" }],
  factory: one => one + one
});