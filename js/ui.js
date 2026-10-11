export class UIController {
    constructor() {
        this.el = {
            formula: document.getElementById("formula"),
            mu: document.getElementById("mu"),
            x0: document.getElementById("x0"),
            N: document.getElementById("N"),
            samples: document.getElementById("samples"),
            xmin: document.getElementById("xmin"),
            xmax: document.getElementById("xmax"),
            run: document.getElementById("run"),
            err: document.getElementById("err")
        };
    }

    bindRun(handler) {
        this.el.run.addEventListener("click", handler);
    }

    getInput() {
        const formula = this.el.formula.value;

        const mu = Number(this.el.mu.value);
        const x0 = Number(this.el.x0.value);
        const N = parseInt(this.el.N.value, 10);
        const samples = parseInt(this.el.samples.value, 10);

        const xminStr = this.el.xmin.value.trim();
        const xmaxStr = this.el.xmax.value.trim();

        const xmin = xminStr === "" ? null : Number(xminStr);
        const xmax = xmaxStr === "" ? null : Number(xmaxStr);

        return { formula, mu, x0, N, samples, xmin, xmax };
    }

    setError(msg) {
        this.el.err.textContent = msg || "";
    }
}