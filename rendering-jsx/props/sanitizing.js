import { sanitizeJsxElements } from "../elements/sanitizing.js";

export const sanitizeJsxPropsChildren = (props, children) => ({ ...props, children: sanitizeJsxElements(children) })