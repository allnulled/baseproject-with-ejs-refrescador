return define({
  as: "five",
  factory: async function() {
    // await require("timers/promises").setTimeout(100);
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(5), 0);
    })
  },
});