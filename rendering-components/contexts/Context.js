import { getEffects, useEffect } from "../../rendering-effects/mod.js"
import { getContexts } from "./getting.js"
import { useContext } from "./using.js"

export const Context = ({name, value, children}, elem) =>
{
  const contexts = getContexts(elem)
  const effects = getEffects(elem)
  const [, setContext] = useContext(contexts, name, value, elem)

  useEffect(effects, "setcontext", () => setContext(value, elem), [value])
  return children
}