import { update } from "../../rendering/mod.js"
import { equalData as equalContextValues } from "../../rendering-equalities/mod.js"
import { getContext, getContexts } from "./getting.js"
import { findConsumer, findProducer } from "./finding.js"
import { setContextValue } from "./setting.js";

export const updateConsumerContext = (name, value, elem) => {
  const contexts = getContexts(elem)
  const context = getContext(contexts, name)
  if(equalContextValues(context.value, value)) return

  setContextValue(context, value)
  return update(elem)
}

export const updateProducerContext = (name, value, elem) => {
  const contexts = getContexts(elem)
  const context = getContext(contexts, name)
  return setContextValue(context, value)
}

export const updateContexts = (name, value, elem) => {
  const producer = findProducer(elem, name)
  updateProducerContext(name, value, producer)

  return findConsumer(producer, name)
    .map(consumer => updateConsumerContext(name, value, consumer))
}

