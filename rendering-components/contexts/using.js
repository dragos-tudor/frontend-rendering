import { createContext } from "./creating.js"
import { getContext, getInitialContextValue } from "./getting.js"
import { setContext } from "./setting.js"
import { updateContexts } from "./updating.js"
import { existsContext } from "./verifying.js"

export const useContext = (contexts, name, initialValue, elem) =>
{
  if(!existsContext(contexts, name)) {
    const context = createContext(name, getInitialContextValue(name, initialValue, elem))
    setContext(contexts, context)
  }

  const context = getContext(contexts, name)
  return [context.value, (value) => updateContexts(name, value, elem)]
}
