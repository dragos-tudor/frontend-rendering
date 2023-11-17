import { isHtmlText } from "./verifying.js"

export const getHtmlText = ($elem) => isHtmlText($elem) && $elem.textContent