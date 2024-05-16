import { dispatchEvent } from "../../rendering-html/mod.js"

export const dispatchError = (elem, error) => dispatchEvent(elem, "error", {error})