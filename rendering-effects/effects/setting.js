import { getEffect } from "./getting.js";

export const setDepsEffect = (effect, deps) => effect.deps = deps

export const setEffect = (effects, effect) => effects[effect.name] = effect

export const setEffects = (elem, effects = {}) => elem.__effects = elem.__effects ?? effects

export const setFuncEffect = (effect, func) => effect.func = func

export const setInitialFuncEffect = (effect, func) => effect.initialFunc = func

export const resetInitialFuncEffect = (effect) => effect.initialFunc = undefined

export const setInitialEffect = (effects, name, func) => setInitialFuncEffect(getEffect(effects, name), func)

export const resetEffectFunc = (effect) => effect.func = undefined