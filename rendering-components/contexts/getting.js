import { findProducer } from "./finding.js";

export const getContext = (contexts, name) => contexts[name]

export const getContexts = (elem) => elem.__contexts

export const getContextValue = (contexts, name) => getContext(contexts, name).value

export const getProducerContextValue = (name, fallbackValue, elem) =>
{
  const producer = findProducer(elem, name)
  if(!producer) return fallbackValue

  const contexts = getContexts(producer)
  const context = getContext(contexts, name)
  return context.value
}