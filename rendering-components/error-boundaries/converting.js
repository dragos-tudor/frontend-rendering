import { getHtmlName } from "../../rendering-html/mod.js";

export const toStringErrorPath = (elems) => elems.map(getHtmlName).reverse().join("/")