
export const runInitialFunc = (effect) => effect.initialFunc?.()

export const runInitialEffects = (effects) =>
  Object.values(effects).map(runInitialFunc)