
export const runInitialFunc = (effect) => effect.initialFunc?.()

export const runFunc = (effect) => effect.func?.()

export const runInitialEffects = (effects) => effects? Object.values(effects).map(runInitialFunc): []

export const runEffects = (effects) => effects? Object.values(effects).map(runFunc): []