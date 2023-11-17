import { equalArrays as equalDeps } from "../../support-equalities/mod.js";
import { createEffect } from "./creating.js";
import { getEffect } from "./getting.js"
import { runInitialFunc } from "./running.js"
import { setEffect, setEffectDeps, setEffectInitialFunc } from "./setting.js"
import { existsEffect, isDefaultDeps } from "./verifying.js";

export const useEffect = (effects, name, func, deps) =>
{
  if(!existsEffect(effects, name)) {
    setEffect(effects, createEffect(name, deps))
    return func()
  }

  const effect = getEffect(effects, name)

  runInitialFunc(effect)
  setEffectInitialFunc(effect, undefined)

  if(equalDeps(effect.deps, deps) && !isDefaultDeps(deps))
    return

  setEffectDeps(effect, deps)
  return func()
}
