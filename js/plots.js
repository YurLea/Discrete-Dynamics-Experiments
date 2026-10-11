import { linspace } from "./utils.js";

export class PlotManager {
    constructor({ cobwebId, timeId }) {
        this.cobwebId = cobwebId;
        this.timeId = timeId;

        this.config = { responsive: true, displaylogo: false };

        const ro = new ResizeObserver((entries) => {
            for (const e of entries) {
                const gd = e.target;
                if (gd && gd.classList.contains("js-plotly-plot")) continue;
                Plotly.Plots.resize(gd);
            }
        });

        ro.observe(document.getElementById(this.cobwebId));
        ro.observe(document.getElementById(this.timeId));
    }

    async plotCobweb({ f, mu, xs, xmin, xmax, samples, cobwebPath }) {
        const xgrid = linspace(xmin, xmax, samples);
        const ygrid = xgrid.map(x => f.eval(x, mu));

        const traceF = {
            type: "scatter",
            mode: "lines",
            name: "y = f(x)",
            x: xgrid,
            y: ygrid,
            line: { width: 2, color: "rgba(37, 99, 235, 0.95)" }
        };

        const traceDiag = {
            type: "scatter",
            mode: "lines",
            name: "y = x",
            x: [xmin, xmax],
            y: [xmin, xmax],
            line: { width: 2, color: "rgba(107, 114, 128, 0.85)", dash: "dash" }
        };

        const traceCob = {
            type: "scatter",
            mode: "lines",
            name: "Лестница (итерации)",
            x: cobwebPath.cx,
            y: cobwebPath.cy,
            line: { width: 2, color: "#111827" }
        };

        const layoutCob = {
            title: { text: "Лестница Ламерея: (xₙ, xₙ₊₁)", font: { size: 14 } },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            margin: { l: 55, r: 20, t: 40, b: 45 },

            xaxis: {
                title: "xₙ",
                range: [xmin, xmax],
                gridcolor: "rgba(17,24,39,0.10)",
                zerolinecolor: "rgba(17,24,39,0.18)",
                constrain: "domain"
            },
            yaxis: {
                title: "xₙ₊₁",
                gridcolor: "rgba(17,24,39,0.10)",
                zerolinecolor: "rgba(17,24,39,0.18)",
                scaleanchor: "x",
                scaleratio: 1,
                constrain: "domain"
            },
            font: { color: "#111827" },

            legend: { orientation: "h", y: -0.18 }
        };

        await Plotly.newPlot(this.cobwebId, [traceF, traceDiag, traceCob], layoutCob, this.config);
    }

    async plotTimeSeries(xs) {
        const ngrid = Array.from({ length: xs.length }, (_, i) => i);

        const traceTime = {
            type: "scatter",
            mode: "lines+markers",
            name: "xₙ",
            x: ngrid,
            y: xs,
            line: { width: 2, color: "#111827" },
            marker: { size: 6, color: "#111827" }
        };

        const layoutTime = {
            title: { text: "Зависимость xₙ от n", font: { size: 14 } },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            margin: { l: 55, r: 20, t: 40, b: 45 },
            xaxis: {
                title: "n",
                gridcolor: "rgba(17,24,39,0.10)",
                zerolinecolor: "rgba(17,24,39,0.18)"
            },
            yaxis: {
                title: "xₙ",
                gridcolor: "rgba(17,24,39,0.10)",
                zerolinecolor: "rgba(17,24,39,0.18)"
            },
            font: { color: "#111827" },
            showlegend: false
        };

        await Plotly.newPlot(this.timeId, [traceTime], layoutTime, this.config);
    }
}