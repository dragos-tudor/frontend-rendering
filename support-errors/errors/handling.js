import { logError } from "../../support-loggers/mod.js"
import { dispatchError } from "./dispatching.js"

export const handleError = (func, elem) => {
  try { return func() }
  catch(error) {
    logError(elem, error.message, error.stack)
    dispatchError(elem, error)
    throw error
  }
}