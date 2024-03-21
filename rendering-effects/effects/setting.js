import { getEffect } from "./getting.js";

export const setEffectDeps = (effect, deps) => effect.deps = deps

export const setEffectInitialFunc = (effect, func) => effect.initialFunc = func

export const setEffect = (effects, effect) => effects[effect.name] = effect

export const setEffects = (elem, effects = {}) => elem.__effects = elem.__effects ?? effects

export const setInitialEffect = (effects, name, func) =>
  setEffectInitialFunc(getEffect(effects, name), func)