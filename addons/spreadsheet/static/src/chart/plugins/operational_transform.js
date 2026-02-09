import * as spreadsheet from "@BetopiaERP/o-spreadsheet";
const { inverseCommandRegistry, otRegistry } = spreadsheet.registries;

function identity(cmd) {
    return [cmd];
}

otRegistry.addTransformation(
    "DELETE_CHART",
    ["LINK_BetopiaERP_MENU_TO_CHART"],
    (toTransform, executed) => {
        if (executed.chartId === toTransform.chartId) {
            return undefined;
        }
        return toTransform;
    }
);

inverseCommandRegistry.add("LINK_BetopiaERP_MENU_TO_CHART", identity);
