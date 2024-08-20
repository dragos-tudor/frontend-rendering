import { validateHtmlElement } from "../../rendering-html/mod.js"
import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { createJsxElement } from "../../rendering-jsx/mod.js"
import { validateLazyLoader } from "./validating.js"
import { throwError } from "./throwing.js"
import { render } from "../../mod.js";
import { setStates, useState } from "../../rendering-states/mod.js";

export const Lazy = (props, elem) =>
{
  throwError(validateHtmlElement(elem))
  throwError(validateLazyLoader(props.loader))

  const [factory, setFactory] = useState(setStates(elem), "factory", undefined, [])
  useEffect(setEffects(elem), "load", async () => {
    const factory = await props.loader()
    setFactory(factory)
    render(createJsxElement(factory, props), elem)
  }, [])

  if(factory) return createJsxElement(factory, props)
  return <></>
}