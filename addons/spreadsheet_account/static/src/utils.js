// @ts-check

import { helpers } from "@BetopiaERP/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/**
 * @typedef {import("@BetopiaERP/o-spreadsheet").Token} Token
 * @typedef  {import("@spreadsheet/helpers/BetopiaERP_functions_helpers").BetopiaERPFunctionDescription} BetopiaERPFunctionDescription
 */

/**
 * @param {Token[]} tokens
 * @returns {number}
 */
export function getNumberOfAccountFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["BetopiaERP.BALANCE", "BetopiaERP.CREDIT", "BetopiaERP.DEBIT", "BetopiaERP.RESIDUAL", "BetopiaERP.PARTNER.BALANCE", "BetopiaERP.BALANCE.TAG"]).length;
}

/**
 * Get the first Account function description of the given formula.
 *
 * @param {Token[]} tokens
 * @returns {BetopiaERPFunctionDescription | undefined}
 */
export function getFirstAccountFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["BetopiaERP.BALANCE", "BetopiaERP.CREDIT", "BetopiaERP.DEBIT", "BetopiaERP.RESIDUAL", "BetopiaERP.PARTNER.BALANCE", "BetopiaERP.BALANCE.TAG"])[0];
}
