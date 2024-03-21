import { getHtmlPropNames } from "../elements/getting.js";
import { isInternalName } from "./verifying.js"

const unstoreInternal = (elem, propName) => { delete elem[propName]; return elem }

export const unstoreInternals = ($elem) =>
  getHtmlPropNames($elem)
    .filter(isInternalName)
    .reduce(unstoreInternal, $elem)
