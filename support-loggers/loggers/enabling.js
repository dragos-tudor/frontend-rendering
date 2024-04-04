import { isLogMounted } from "./verifying.js"
import { mountLog } from "./mounting.js"

export const enableLogging = ($elem, $parent) =>
  isLogMounted($elem) ||
  (isLogMounted($parent) && mountLog($elem, $parent))