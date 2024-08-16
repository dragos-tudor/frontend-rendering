import { setLog } from "./setting.js"
import { isLogSet } from "./verifying.js"

export const enableLogging = ($elem, $parent) => isLogSet($elem) || (isLogSet($parent) && setLog($elem, $parent))