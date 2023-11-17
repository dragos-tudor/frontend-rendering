import { findProducer } from "./finding.js";

export const getContext = (contexts, name) => contexts[name]

export const getContexts = (elem) => elem.__contexts

export const getInitialContextValue = (name, initialValue, elem) =>
{
  const producer = findProducer(elem, name)
  if(!producer) return initialValue

  const contexts = getContexts(producer)
  const context = getContext(contexts, name)
  return context.value
}