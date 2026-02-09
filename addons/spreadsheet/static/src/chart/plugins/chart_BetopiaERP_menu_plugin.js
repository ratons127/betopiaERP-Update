import { BetopiaERPCorePlugin } from "@spreadsheet/plugins";
import { coreTypes, constants } from "@BetopiaERP/o-spreadsheet";
const { FIGURE_ID_SPLITTER } = constants;

/** Plugin that link charts with BetopiaERP menus. It can contain either the Id of the BetopiaERP menu, or its xml id. */
export class ChartBetopiaERPMenuPlugin extends BetopiaERPCorePlugin {
    static getters = /** @type {const} */ (["getChartBetopiaERPMenu"]);
    constructor(config) {
        super(config);
        this.BetopiaERPMenuReference = {};
    }

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "LINK_BetopiaERP_MENU_TO_CHART":
                this.history.update("BetopiaERPMenuReference", cmd.chartId, cmd.BetopiaERPMenuId);
                break;
            case "DELETE_CHART":
                this.history.update("BetopiaERPMenuReference", cmd.chartId, undefined);
                break;
            case "DUPLICATE_SHEET":
                this.updateOnDuplicateSheet(cmd.sheetId, cmd.sheetIdTo);
                break;
        }
    }

    updateOnDuplicateSheet(sheetIdFrom, sheetIdTo) {
        for (const oldChartId of this.getters.getChartIds(sheetIdFrom)) {
            const menu = this.BetopiaERPMenuReference[oldChartId];
            if (!menu) {
                continue;
            }
            const chartIdBase = oldChartId.split(FIGURE_ID_SPLITTER).pop();
            const newChartId = `${sheetIdTo}${FIGURE_ID_SPLITTER}${chartIdBase}`;
            this.history.update("BetopiaERPMenuReference", newChartId, menu);
        }
    }

    /**
     * Get BetopiaERP menu linked to the chart
     *
     * @param {string} chartId
     * @returns {object | undefined}
     */
    getChartBetopiaERPMenu(chartId) {
        const menuId = this.BetopiaERPMenuReference[chartId];
        return menuId ? this.getters.getIrMenu(menuId) : undefined;
    }

    import(data) {
        if (data.chartBetopiaERPMenusReferences) {
            this.BetopiaERPMenuReference = data.chartBetopiaERPMenusReferences;
        }
    }

    export(data) {
        data.chartBetopiaERPMenusReferences = this.BetopiaERPMenuReference;
    }
}

coreTypes.add("LINK_BetopiaERP_MENU_TO_CHART");
