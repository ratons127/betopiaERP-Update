import { SpreadsheetChildEnv as SSChildEnv } from "@BetopiaERP/o-spreadsheet";
import { Services } from "services";

declare module "@spreadsheet" {
    import { Model } from "@BetopiaERP/o-spreadsheet";

    export interface SpreadsheetChildEnv extends SSChildEnv {
        model: BetopiaERPSpreadsheetModel;
        services: Services;
    }
}
