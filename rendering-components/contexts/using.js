import { createContext } from "./creating.js"
import { getContextValue, getProducerContextValue } from "./getting.js"
import { setContext } from "./setting.js"
import { updateContexts } from "./updating.js"
import { existsContext } from "./verifying.js"

export const useContext = (contexts, name, initialValue, elem) =>
{
  if(!existsContext(contexts, name)) {
    const contextValue = getProducerContextValue(name, initialValue, elem)
    const context = createContext(name, contextValue)
    setContext(contexts, context)
  }

  return [
    getContextValue(contexts, name),
    (value) => updateContexts(name, value, elem)
  ]
}
