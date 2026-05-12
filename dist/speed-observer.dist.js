(function(factory) {
    const mod = factory();
    if (typeof window !== 'undefined') {
        window['SpeedObserver'] = mod;
    }
    if (typeof global !== 'undefined') {
        global['SpeedObserver'] = mod;
    }
    if (typeof module !== 'undefined') {
        module.exports = mod;
    }
})(function() {

    (function(factory) {
        const mod = factory();
        if (typeof window !== 'undefined') {
            window['Colors'] = mod;
        }
        if (typeof global !== 'undefined') {
            global['Colors'] = mod;
        }
        if (typeof module !== 'undefined') {
            module.exports = mod;
        }
    })(function() {

        return Object.assign({
            available: {

                // estilos
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                blink: [5, 25],
                inverse: [7, 27],
                strike: [9, 29],

                // colores
                black: [30, 39],
                red: [31, 39],
                green: [32, 39],
                yellow: [33, 39],
                blue: [34, 39],
                magenta: [35, 39],
                cyan: [36, 39],
                white: [37, 39],

                // fondo
                bgBlack: [40, 49],
                bgRed: [41, 49],
                bgGreen: [42, 49],
                bgYellow: [43, 49],
                bgBlue: [44, 49],
                bgMagenta: [45, 49],
                bgCyan: [46, 49],
                bgWhite: [47, 49],

                // brillantes
                blackBright: [90, 39],
                redBright: [91, 39],
                greenBright: [92, 39],
                yellowBright: [93, 39],
                blueBright: [94, 39],
                magentaBright: [95, 39],
                cyanBright: [96, 39],
                whiteBright: [97, 39],

                bgBlackBright: [100, 49],
                bgRedBright: [101, 49],
                bgGreenBright: [102, 49],
                bgYellowBright: [103, 49],
                bgBlueBright: [104, 49],
                bgMagentaBright: [105, 49],
                bgCyanBright: [106, 49],
                bgWhiteBright: [107, 49],

            },
            endToken: "\x1b[0m",
            squad: {
                tl: "┌",
                tr: "┐",
                bl: "└",
                br: "┘",
            },
            line: {
                h: "─",
                v: "│",
            },
            style: function(config = "red,bold,underline") {
                const styles = config.split(",");
                return {
                    text: (text) => {
                        const begin = styles.reduce((out, it) => {
                            if (!(it in this.available)) {
                                return out;
                            }
                            const code = this.available[it];
                            out += `\x1b[${code[0]}m`;
                            return out;
                        }, "");
                        const end = this.endToken;
                        return `${begin}${text}${end}`;
                    }
                }
            },
            stripAnsi: function(str) {
                return str.replace(/\x1b\[[0-9;]*m/g, "");
            },
            box: function(text, style = "") {
                const lines = text.split("\n");
                const cleanLines = lines.map(l => this.stripAnsi(l));
                const width = Math.max(...cleanLines.map(l => l.length));
                const top = "┌" + "─".repeat(width + 3) + "┐";
                const bottom = "└" + "─".repeat(width + 3) + "┘";
                const body = lines
                    .map(line => {
                        const clean = this.stripAnsi(line);
                        const pad = width - clean.length;
                        return "│ " + line + " ".repeat(pad) + " │";
                    })
                    .join("\n");
                return `${top}\n${body}\n${bottom}`;
            }
        }, {
            table: function table(listOfColumns, options = {}) {
                const Table = require("cli-table3");
                const table = new Table(options);
                table.push(...listOfColumns);
                return table.toString();
            },
        });

    });

    const SpeedObserver = class SpeedObserver {
        static create = function(...args) {
            return new this(...args);
        };
        constructor() {
            this.startedAt = new Date();
            this.records = [];
        }
        start = function() {
            this.startedAt = new Date();
        };
        stop = function() {
            return (new Date()).getTime() - this.startedAt.getTime();
        };
        print = function(op = "Operation", ms = false, msg = '  [*] Operation «{op}» took: {ms} milliseconds') {
            const time = typeof ms === "number" ? ms : this.stop();
            const out = msg.replace("{op}", op).replace("{ms}", time);
            console.log(out);
        };
        save = function(op, extra = {}) {
            this.records.push({
                op: op,
                ms: this.stop(),
                ...extra,
            });
        };
        report = function(asText = false) {
            const minPad = 13;
            const minStyle = "black,bgGreen";
            const minStyleName = "greenBright";
            const maxStyle = "black,bgRed";
            const maxStyleName = "redBright";
            if (this.records.length === 0) return;
            let max = -Infinity;
            let min = Infinity;
            let maxOpLength = 0;
            for (let index = 0; index < this.records.length; index++) {
                const {
                    op,
                    ms
                } = this.records[index];
                if (ms > max) max = ms;
                if (ms < min) min = ms;
                if (op.length > maxOpLength) maxOpLength = op.length;
            }
            const safeMin = min === 0 ? 1 : min;
            const safeMax = max === 0 ? 1 : max;
            let out = "";
            for (let index = 0; index < this.records.length; index++) {
                const record = this.records[index];
                const {
                    op,
                    ms
                } = record;
                record.percentageMin = (((Math.max(ms, 1) / safeMin) * 100)).toFixed(2);
                record.percentageMax = (((Math.max(ms, 1) / safeMax) * 100)).toFixed(2);
                let opColumn = `  [⏳] ${op}:`.padEnd(maxOpLength + 22);
                let msColumn = `${ms} ms`.padStart(minPad);
                const isMin = record.percentageMin === "100.00";
                const isMax = record.percentageMax === "100.00";
                if (isMin) {
                    const minColumn = SpeedObserver.colors.style(minStyleName).text(` ${record.percentageMin} %`.padStart(minPad));
                    const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
                    opColumn = SpeedObserver.colors.style(minStyle).text(opColumn);
                    msColumn = SpeedObserver.colors.style(minStyle).text(msColumn);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn}`;
                    const formatted = msg;
                    out += formatted;
                } else if (isMax) {
                    const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
                    const maxColumn = SpeedObserver.colors.style(maxStyleName).text(` ${record.percentageMax} %`.padStart(minPad));
                    opColumn = SpeedObserver.colors.style(maxStyle).text(opColumn);
                    msColumn = SpeedObserver.colors.style(maxStyle).text(msColumn);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn}`;
                    const formatted = msg;
                    out += formatted;
                } else {
                    const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
                    const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn}`;
                    out += msg;
                }
                out += "\n";
            }
            if (asText) {
                return out.trim();
            }
            console.log(this.constructor.colors.box(out.trim()));
        };
        static colors = Colors;
        static reportCollection = function(testResults) {
            Iterating_collections: for (let index = 0; index < testResults.length; index++) {
                const testInfo = testResults[index];
                const {
                    title,
                    tests
                } = testInfo;
                const cols = [];
                Iterating_files:
                    for (let indexFile = 0; indexFile < tests.length; indexFile++) {
                        const test = tests[indexFile];
                        const {
                            op,
                            status,
                            ms
                        } = test;
                        cols.push([
                            SpeedObserver.colors.style("italic,white").text(` ⏳ ${ms} ms `),
                            status,
                            SpeedObserver.colors.style("italic,magenta").text(op),
                        ]);
                    }
                console.log(SpeedObserver.colors.table([
                    // ["Time", "Status", "File"]
                ].concat(cols), {
                    head: [{
                        colSpan: 3,
                        content: title
                    }],
                    style: {
                        border: ["yellow"],
                        head: ["white", "bold"],
                    }
                }));
            }
        };
    };

    return SpeedObserver;

});