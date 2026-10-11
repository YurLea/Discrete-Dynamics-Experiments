import { autoRangeFromData, isFiniteNumber } from "./utils.js";
import { ExpressionFunction } from "./expression.js";
import { IterationModel } from "./model.js";

export class App {
    constructor({ ui, plotManager }) {
        this.ui = ui;
        this.plotManager = plotManager;
    }

    async runOnce() {
        this.ui.setError("");

        const { formula, mu, x0, N, samples, xmin: userXmin, xmax: userXmax } = this.ui.getInput();

        if (!isFiniteNumber(mu)) throw new Error("mu должно быть числом.");
        if (!isFiniteNumber(x0)) throw new Error("x0 должно быть числом.");
        if (!Number.isInteger(N) || N < 1) throw new Error("N должно быть целым числом >= 1.");
        if (!Number.isInteger(samples) || samples < 5)
            throw new Error("Число точек для графика должно быть >= 5.");

        const f = new ExpressionFunction(formula);
        const model = new IterationModel(f);

        const xs = model.computeIterates(x0, mu, N);
        const cobwebPath = model.makeCobwebPath(xs);

        let [xmin, xmax] = autoRangeFromData(xs);

        if (userXmin !== null) xmin = userXmin;
        if (userXmax !== null) xmax = userXmax;

        if (!isFiniteNumber(xmin) || !isFiniteNumber(xmax) || xmin >= xmax) {
            throw new Error("Некорректный диапазон xmin/xmax.");
        }

        await this.plotManager.plotCobweb({ f, mu, xs, xmin, xmax, samples, cobwebPath });
        await this.plotManager.plotTimeSeries(xs);
    }

    start() {
        this.ui.bindRun(async () => {
            try {
                await this.runOnce();
            } catch (e) {
                this.ui.setError(e?.message ? e.message : String(e));
                console.error(e);
            }
        });
    }
}