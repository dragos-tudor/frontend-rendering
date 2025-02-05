import { getJsxElementProps } from "../elements/getting.js"
import { sanitizeJsxElements } from "../elements/sanitizing.js"
import { isJsxElementsArray } from "../elements/verifying.js"
import { toJsxPropsChildrenArray } from "../props/converting.js"
import { runJsxFactory } from "./running.js"

export const buildJsxFactoryChildren = (elem, $elem) =>
{
  const props = getJsxElementProps(elem)
  const children = sanitizeJsxElements(toJsxPropsChildrenArray(props))
  const elems = runJsxFactory(elem, $elem, {...props, children})

  return sanitizeJsxElements(isJsxElementsArray(elems)? elems: [elems])
}
