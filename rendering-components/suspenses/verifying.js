import { getHtmlName } from "../../rendering-html/mod.js"

export const isSuspenseElement = (elem) =>
  getHtmlName(elem) === "suspense"