import { dispatchEvent } from "../../rendering-events/mod.js"

export const dispatchError = (elem, error) => dispatchEvent(elem, "error", {error})