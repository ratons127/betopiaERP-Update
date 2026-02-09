// @ts-check

import { helpers } from "@BetopiaERP/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/** @typedef {import("@BetopiaERP/o-spreadsheet").Token} Token */

/**
 * Parse a spreadsheet formula and detect the number of LIST functions that are
 * present in the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {number}
 */
export function getNumberOfListFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["BetopiaERP.LIST", "BetopiaERP.LIST.HEADER"]).length;
}

/**
 * Get the first List function description of the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {import("../helpers/BetopiaERP_functions_helpers").BetopiaERPFunctionDescription|undefined}
 */
export function getFirstListFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["BetopiaERP.LIST", "BetopiaERP.LIST.HEADER"])[0];
}
