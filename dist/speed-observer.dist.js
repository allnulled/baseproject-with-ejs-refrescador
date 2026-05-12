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
        save = function(op) {
            this.records.push({
                op: op,
                ms: this.stop(),
            });
        };
        report = function() {
            const minPad = 13;
            const minStyle = "underline,bold,greenBright";
            const minStyleName = "greenBright";
            const maxStyle = "underline,bold,redBright";
            const maxStyleName = "redBright";
            let max = 0;
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
            for (let index = 0; index < this.records.length; index++) {
                const record = this.records[index];
                const {
                    op,
                    ms
                } = record;
                record.percentageMin = (((ms / min) * 100)).toFixed(2);
                record.percentageMax = (((ms / max) * 100)).toFixed(2);
                let opColumn = `  [*] Operation «${op}»:`.padEnd(maxOpLength + 22);
                let msColumn = `${ms} ms`.padStart(minPad);
                const isMin = record.percentageMin === "100.00";
                const isMax = record.percentageMax === "100.00";
                if (isMin) {
                    const minColumn = SpeedObserver.colors.style(minStyleName).text(` ${record.percentageMin} %`.padStart(minPad));
                    const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
                    opColumn = SpeedObserver.colors.style(minStyle).text(opColumn);
                    msColumn = SpeedObserver.colors.style(minStyle).text(msColumn);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
                    const formatted = msg;
                    console.log(formatted);
                } else if (isMax) {
                    const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
                    const maxColumn = SpeedObserver.colors.style(maxStyleName).text(` ${record.percentageMax} %`.padStart(minPad));
                    opColumn = SpeedObserver.colors.style(maxStyle).text(opColumn);
                    msColumn = SpeedObserver.colors.style(maxStyle).text(msColumn);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
                    const formatted = msg;
                    console.log(formatted);
                } else {
                    const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
                    const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
                    const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
                    console.log(msg);
                }
            }
        };
        static colors = {
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
            }
        };
    };

    return SpeedObserver;

});