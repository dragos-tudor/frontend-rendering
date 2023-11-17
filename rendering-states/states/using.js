import { equalArrays as equalDeps } from "../../support-equalities/mod.js";
import { createState } from "./creating.js";
import { getState, getStateUsage } from "./getting.js"
import { setState, setStateDeps, setStateValue } from "./setting.js"
import { existsState, isDefaultDeps } from "./verifying.js";

export const useState = (states, name, value, deps) => {
  if(!existsState(states, name)) {
    const state = setState(states, createState(name, value, deps))
    return getStateUsage(state)
  }

  const state = getState(states, name)
  if(equalDeps(state.deps, deps) && !isDefaultDeps(deps))
    return getStateUsage(state)

  setStateDeps(state, deps)
  setStateValue(state, value)
  return getStateUsage(state)
}