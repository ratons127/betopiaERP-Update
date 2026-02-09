import * as spreadsheet from "@BetopiaERP/o-spreadsheet";
import { BetopiaERPChartCorePlugin } from "./plugins/BetopiaERP_chart_core_plugin";
import { ChartBetopiaERPMenuPlugin } from "./plugins/chart_BetopiaERP_menu_plugin";
import { BetopiaERPChartCoreViewPlugin } from "./plugins/BetopiaERP_chart_core_view_plugin";
import { _t } from "@web/core/l10n/translation";
import { chartBetopiaERPMenuPlugin } from "./BetopiaERP_menu/BetopiaERP_menu_chartjs_plugin";

const { chartComponentRegistry, chartSubtypeRegistry, chartJsExtensionRegistry } =
    spreadsheet.registries;
const { ChartJsComponent, ZoomableChartJsComponent } = spreadsheet.components;

chartComponentRegistry.add("BetopiaERP_bar", ZoomableChartJsComponent);
chartComponentRegistry.add("BetopiaERP_line", ZoomableChartJsComponent);
chartComponentRegistry.add("BetopiaERP_pie", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_radar", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_sunburst", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_treemap", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_waterfall", ZoomableChartJsComponent);
chartComponentRegistry.add("BetopiaERP_pyramid", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_scatter", ZoomableChartJsComponent);
chartComponentRegistry.add("BetopiaERP_combo", ZoomableChartJsComponent);
chartComponentRegistry.add("BetopiaERP_geo", ChartJsComponent);
chartComponentRegistry.add("BetopiaERP_funnel", ChartJsComponent);

chartSubtypeRegistry.add("BetopiaERP_line", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_line" && !definition.stacked && !definition.fillArea,
    subtypeDefinition: { stacked: false, fillArea: false },
    displayName: _t("Line"),
    chartSubtype: "BetopiaERP_line",
    chartType: "BetopiaERP_line",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.LINE_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_stacked_line", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_line" && definition.stacked && !definition.fillArea,
    subtypeDefinition: { stacked: true, fillArea: false },
    displayName: _t("Stacked Line"),
    chartSubtype: "BetopiaERP_stacked_line",
    chartType: "BetopiaERP_line",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.STACKED_LINE_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_area", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_line" && !definition.stacked && definition.fillArea,
    subtypeDefinition: { stacked: false, fillArea: true },
    displayName: _t("Area"),
    chartSubtype: "BetopiaERP_area",
    chartType: "BetopiaERP_line",
    category: "area",
    preview: "o-spreadsheet-ChartPreview.AREA_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_stacked_area", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_line" && definition.stacked && definition.fillArea,
    subtypeDefinition: { stacked: true, fillArea: true },
    displayName: _t("Stacked Area"),
    chartSubtype: "BetopiaERP_stacked_area",
    chartType: "BetopiaERP_line",
    category: "area",
    preview: "o-spreadsheet-ChartPreview.STACKED_AREA_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_bar", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_bar" && !definition.stacked && !definition.horizontal,
    subtypeDefinition: { stacked: false, horizontal: false },
    displayName: _t("Column"),
    chartSubtype: "BetopiaERP_bar",
    chartType: "BetopiaERP_bar",
    category: "column",
    preview: "o-spreadsheet-ChartPreview.COLUMN_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_stacked_bar", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_bar" && definition.stacked && !definition.horizontal,
    subtypeDefinition: { stacked: true, horizontal: false },
    displayName: _t("Stacked Column"),
    chartSubtype: "BetopiaERP_stacked_bar",
    chartType: "BetopiaERP_bar",
    category: "column",
    preview: "o-spreadsheet-ChartPreview.STACKED_COLUMN_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_horizontal_bar", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_bar" && !definition.stacked && definition.horizontal,
    subtypeDefinition: { stacked: false, horizontal: true },
    displayName: _t("Bar"),
    chartSubtype: "BetopiaERP_horizontal_bar",
    chartType: "BetopiaERP_bar",
    category: "bar",
    preview: "o-spreadsheet-ChartPreview.BAR_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_horizontal_stacked_bar", {
    matcher: (definition) =>
        definition.type === "BetopiaERP_bar" && definition.stacked && definition.horizontal,
    subtypeDefinition: { stacked: true, horizontal: true },
    displayName: _t("Stacked Bar"),
    chartSubtype: "BetopiaERP_horizontal_stacked_bar",
    chartType: "BetopiaERP_bar",
    category: "bar",
    preview: "o-spreadsheet-ChartPreview.STACKED_BAR_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_combo", {
    displayName: _t("Combo"),
    chartSubtype: "BetopiaERP_combo",
    chartType: "BetopiaERP_combo",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.COMBO_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_pie", {
    displayName: _t("Pie"),
    matcher: (definition) => definition.type === "BetopiaERP_pie" && !definition.isDoughnut,
    subtypeDefinition: { isDoughnut: false },
    chartSubtype: "BetopiaERP_pie",
    chartType: "BetopiaERP_pie",
    category: "pie",
    preview: "o-spreadsheet-ChartPreview.PIE_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_doughnut", {
    matcher: (definition) => definition.type === "BetopiaERP_pie" && definition.isDoughnut,
    subtypeDefinition: { isDoughnut: true },
    displayName: _t("Doughnut"),
    chartSubtype: "BetopiaERP_doughnut",
    chartType: "BetopiaERP_pie",
    category: "pie",
    preview: "o-spreadsheet-ChartPreview.DOUGHNUT_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_scatter", {
    displayName: _t("Scatter"),
    chartType: "BetopiaERP_scatter",
    chartSubtype: "BetopiaERP_scatter",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.SCATTER_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_waterfall", {
    displayName: _t("Waterfall"),
    chartSubtype: "BetopiaERP_waterfall",
    chartType: "BetopiaERP_waterfall",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.WATERFALL_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_pyramid", {
    displayName: _t("Population Pyramid"),
    chartSubtype: "BetopiaERP_pyramid",
    chartType: "BetopiaERP_pyramid",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.POPULATION_PYRAMID_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_radar", {
    matcher: (definition) => definition.type === "BetopiaERP_radar" && !definition.fillArea,
    displayName: _t("Radar"),
    chartSubtype: "BetopiaERP_radar",
    chartType: "BetopiaERP_radar",
    subtypeDefinition: { fillArea: false },
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.RADAR_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_filled_radar", {
    matcher: (definition) => definition.type === "BetopiaERP_radar" && !!definition.fillArea,
    displayName: _t("Filled Radar"),
    chartType: "BetopiaERP_radar",
    chartSubtype: "BetopiaERP_filled_radar",
    subtypeDefinition: { fillArea: true },
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.FILLED_RADAR_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_geo", {
    displayName: _t("Geo chart"),
    chartType: "BetopiaERP_geo",
    chartSubtype: "BetopiaERP_geo",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.GEO_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_funnel", {
    matcher: (definition) => definition.type === "BetopiaERP_funnel",
    displayName: _t("Funnel"),
    chartType: "BetopiaERP_funnel",
    chartSubtype: "BetopiaERP_funnel",
    subtypeDefinition: { cumulative: true },
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.FUNNEL_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_treemap", {
    displayName: _t("Treemap"),
    chartType: "BetopiaERP_treemap",
    chartSubtype: "BetopiaERP_treemap",
    category: "hierarchical",
    preview: "o-spreadsheet-ChartPreview.TREE_MAP_CHART",
});
chartSubtypeRegistry.add("BetopiaERP_sunburst", {
    displayName: _t("Sunburst"),
    chartType: "BetopiaERP_sunburst",
    chartSubtype: "BetopiaERP_sunburst",
    category: "hierarchical",
    preview: "o-spreadsheet-ChartPreview.SUNBURST_CHART",
});

chartJsExtensionRegistry.add("chartBetopiaERPMenuPlugin", {
    register: (Chart) => Chart.register(chartBetopiaERPMenuPlugin),
    unregister: (Chart) => Chart.unregister(chartBetopiaERPMenuPlugin),
});

export { BetopiaERPChartCorePlugin, ChartBetopiaERPMenuPlugin, BetopiaERPChartCoreViewPlugin };
