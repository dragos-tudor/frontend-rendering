import { equalArrays as equalDeps } from "../../rendering-equalities/mod.js";
import { createEffect } from "./creating.js";
import { getEffect } from "./getting.js"
import { setEffect, setDepsEffect, setFuncEffect, resetEffectFunc } from "./setting.js"
import { existsEffect, isDefaultDeps } from "./verifying.js";

export const useEffect = (effects, name, func, deps) =>
{
  if(!existsEffect(effects, name))
    return setEffect(effects, createEffect(name, func, deps))

  const effect = getEffect(effects, name)
  if(equalDeps(effect.deps, deps) && !isDefaultDeps(deps)) return (resetEffectFunc(effect), effect)

  setDepsEffect(effect, deps)
  setFuncEffect(effect, func)
  return effect
}
