import { isLogEnabled } from "./verifying.js"

const LibraryName = "rendering"
const LogHeader = "[rendering]"

export const logError = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.error(LogHeader, ...args)

export const logInfo = (elem, ...args) => isLogEnabled(elem, LibraryName) && console.info(LogHeader, ...args)
