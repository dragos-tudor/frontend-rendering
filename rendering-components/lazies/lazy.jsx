import { getHtmlChildren, validateHtmlElement } from "../../rendering-html/mod.js"
import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { validateLazyLoader } from "./validating.js"
import { throwError } from "./throwing.js"
import { render, update } from "../../mod.js";
import { setStates, useState } from "../../rendering-states/mod.js";

export const Lazy = (props, elem) =>
{
  throwError(validateHtmlElement(elem))
  throwError(validateLazyLoader(props.loader))

  const [child, setChild] = useState(setStates(elem), "child", undefined, [])
  useEffect(setEffects(elem), "load child", async () => {
    const child = await props.loader(props)
    setChild(child)

    const $child = getHtmlChildren(elem)[0]
    return $child?
      update($child, child):
      render(child, elem)
  }, [props])

  return child ?? <></>
}