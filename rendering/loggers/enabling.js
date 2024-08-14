import { mountLog } from "./mounting.js"
import { isLogMounted } from "./verifying.js"

export const enableLogging = ($elem, $parent) => isLogMounted($elem) || (isLogMounted($parent) && mountLog($elem, $parent))