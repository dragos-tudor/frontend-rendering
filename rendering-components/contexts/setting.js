
export const setContext = (contexts, context) => (contexts[context.name] = context)

export const setContexts = (elem, contexts = {}) => elem.__contexts = elem.__contexts ?? contexts

export const setContextValue = (context, value) => (context.value = value, context)
