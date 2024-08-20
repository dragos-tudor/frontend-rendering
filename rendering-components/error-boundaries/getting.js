import { findHtmlAscendants } from "../../rendering-html/mod.js";
import { isErrorBoundaryElement } from "./verifying.js";

export const getErrorPath = (source, boundary) => findHtmlAscendants(source, (elem) => isErrorBoundaryElement(elem, boundary))

export const getEventDetailError = (event) => event.detail?.error