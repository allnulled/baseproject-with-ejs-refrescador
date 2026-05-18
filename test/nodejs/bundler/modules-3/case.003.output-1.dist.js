(async function() {
    return define({
        as: "one",
        module: 1
    });
})();
(async function() {
    return define({
        as: "two",
        uses: [],
        factory: one => one + one
    });
})();
(async function() {
    return define({
        as: "three",
        module: 3,
    });
})();
(async function() {
    return define({
        as: "four",
        module: 4,
    });
})();
(async function() {
    return define({
        as: "five",
        factory: async function() {
            // await require("timers/promises").setTimeout(100);
            await new Promise((resolve, reject) => {
                setTimeout(() => resolve(5), 0);
            })
        },
    });
})();