import { sanitizeJsxElements } from "../elements/sanitizing.js"
import { getJsxPropsChildren } from "../props/getting.js"
import { sanitizeJsxPropsChildren } from "../props/sanitizing.js"
import { runJsxFactory } from "./running.js"
import { isJsxArrayElems } from "./verifying.js"

export const buildJsxFactoryChildren = (elem, $elem) => {
  const children = getJsxPropsChildren(elem.props)
  const sanitizeProps = sanitizeJsxPropsChildren(elem.props, children)
  const factoryElems = runJsxFactory(elem, $elem, sanitizeProps)

  return sanitizeJsxElements(isJsxArrayElems(factoryElems)? factoryElems: [factoryElems])
}
