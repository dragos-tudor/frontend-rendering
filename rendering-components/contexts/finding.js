import { findHtmlAscendant, findHtmlDescendants } from "../../rendering-html/mod.js"
import { isContextConsumer, isContextProducer } from "./verifying.js";

export const findProducer = (elem, name) =>
  findHtmlAscendant(elem, elem => isContextProducer(elem, name))

export const findConsumer = (elem, name) =>
 findHtmlDescendants(elem, elem => isContextConsumer(elem, name))