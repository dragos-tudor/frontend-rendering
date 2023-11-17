import { isIgnoreArray } from "./verifying.js"

export const enableIgnoring = ($elem, $parent) => isIgnoreArray($parent) && ($elem.__ignore = [...$parent.__ignore])
