import { render } from "../../rendering/mod.js"
import { validateHtmlElement } from "../../rendering-html/mod.js"
import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { createJsxElement } from "../../rendering-jsx/mod.js"
import { setStates, useState } from "../../rendering-states/mod.js"
import { validateLazyLoader } from "./validating.js"
import { throwError } from "./throwing.js"

export const Lazy = (props, elem) =>
{
  throwError(validateHtmlElement(elem))
  throwError(validateLazyLoader(props.loader))

  const states = setStates(elem)
  const effects = setEffects(elem)
  const [factory, setFactory] = useState(states, "factory", undefined, [])
  if(factory) return createJsxElement(factory, props)

  useEffect(effects, "load", async () => {
    const factory = await props.loader()
    setFactory(factory)
    render(createJsxElement(factory, props), elem)
  })
}