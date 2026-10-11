import { UIController } from "./ui.js";
import { PlotManager } from "./plots.js";
import { App } from "./app.js";

const ui = new UIController();
const plotManager = new PlotManager({ cobwebId: "plotCobweb", timeId: "plotTime" });
const app = new App({ ui, plotManager });

app.start();

(async () => {
    try {
        await app.runOnce();
    } catch (e) {
        ui.setError(e?.message ? e.message : String(e));
    }
})();