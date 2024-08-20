import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { setContexts } from "./setting.js"
import { useContext } from "./using.js"

export const Context = ({name, value, children}, elem) =>
{
  const [, setContext] = useContext(setContexts(elem), name, value, elem)
  useEffect(setEffects(elem), "setcontext", () => setContext(value, elem), [value])

  return children
}