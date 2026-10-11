import { isFiniteNumber, normalizeFormula } from "./utils.js";

export class ExpressionFunction {
    constructor(formulaStr) {
        const normalized = normalizeFormula(formulaStr);
        if (!normalized) throw new Error("Введите формулу.");

        const node = math.parse(normalized);
        this._compiled = node.compile();
        this.formula = normalized;
    }

    eval(x, mu) {
        const v = this._compiled.evaluate({ x, mu });
        const num = (typeof v === "number") ? v : Number(v);
        if (!isFiniteNumber(num)) {
            throw new Error(`f(x) вернула нечисловое/бесконечное значение при x=${x}, mu=${mu}`);
        }
        return num;
    }
}