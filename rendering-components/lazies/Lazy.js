import { render } from "../../rendering/mod.js"
import { throwError } from "../../support-errors/mod.js"
import { validateHtmlElement } from "../../rendering-html/mod.js"
import { getEffects, useEffect } from "../../rendering-effects/mod.js"
import { createJsxElement } from "../../rendering-jsx/mod.js"
import { getStates, useState } from "../../rendering-states/mod.js"
import { suspense, unsuspense } from "../suspenses/suspending.jsx"
import { validateLazyLoader } from "./validating.js"

export const Lazy = (props, elem) =>
{
  throwError(validateHtmlElement(elem))
  throwError(validateLazyLoader(props.loader))

  const loader = props.loader
  const effects = getEffects(elem)
  const states = getStates(elem)
  const [factory, setFactory] = useState(states, "factory", undefined, [])

  if(factory) return createJsxElement(factory, props)

  useEffect(effects, "suspense", () => suspense(elem))
  useEffect(effects, "load", async () => {
    const factory = await loader()
    setFactory(factory)

    unsuspense(elem)
    render(createJsxElement(factory, props), elem)
  })
}