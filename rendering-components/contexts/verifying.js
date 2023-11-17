import { getHtmlName } from "../../rendering-html/mod.js"
import { getContexts } from "./getting.js";

export const existsContext = (contexts, name) => name in contexts

export const isContextConsumer = (elem, name) =>
  getHtmlName(elem) !== "context" && existsContext(getContexts(elem), name)

export const isContextProducer = (elem, name) =>
  getHtmlName(elem) === "context" && existsContext(getContexts(elem), name)