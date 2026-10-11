import { isFiniteNumber } from "./utils.js";

export class IterationModel {
    constructor(f) {
        this.f = f; // объект ExpressionFunction
    }

    computeIterates(x0, mu, N) {
        const xs = new Array(N + 1);
        xs[0] = x0;

        for (let n = 0; n < N; n++) {
            const next = this.f.eval(xs[n], mu);
            xs[n + 1] = next;

            if (!isFiniteNumber(next)) {
                throw new Error(`На шаге n=${n} получено нечисловое/бесконечное значение: ${next}`);
            }
        }
        return xs;
    }

    makeCobwebPath(xs) {
        // (x0,x0)->(x0,x1)->(x1,x1)->(x1,x2)->...
        const cx = [];
        const cy = [];

        for (let n = 0; n < xs.length - 1; n++) {
            const xn = xs[n], xnp1 = xs[n + 1];
            cx.push(xn);   cy.push(xn);
            cx.push(xn);   cy.push(xnp1);
            cx.push(xnp1); cy.push(xnp1);
        }
        return { cx, cy };
    }
}