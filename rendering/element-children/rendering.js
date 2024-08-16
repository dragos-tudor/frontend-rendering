import { getJsxElement } from "../../rendering-jsx/mod.js"
import { renderElement } from "../elements/rendering.js"
import { resolveJsxChildren } from "./resolving.js"

export const renderElementChildren = ($elem) => resolveJsxChildren(getJsxElement($elem), $elem).map(child => renderElement(child, $elem))