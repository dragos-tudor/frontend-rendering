import { setIgnore } from "./setting.js"
import { isIgnoreSet } from "./verifying.js"

export const enableIgnoring = ($elem, $parent) => isIgnoreSet($elem) || (isIgnoreSet($parent) && setIgnore($elem, $parent))
