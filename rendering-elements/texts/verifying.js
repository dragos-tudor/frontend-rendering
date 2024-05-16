import { getHtmlText } from "../../rendering-html/mod.js";
import { getJsxText } from "../../rendering-jsx/mod.js";

export const equalTexts = (elem, $elem) => getJsxText(elem) === getHtmlText($elem)