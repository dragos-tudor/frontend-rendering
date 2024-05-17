import { isLogEnabled } from "./verifying.js"

const Category = "rendering"
const LogHeader = "[rendering]"

export const logError = (elem, ...args) => isLogEnabled(elem, Category) && console.error(LogHeader, ...args)

export const logInfo = (elem, ...args) => isLogEnabled(elem, Category) && console.info(LogHeader, ...args)
