import { setStateValue } from "./setting.js"

export const getState = (states, name) => states[name]

export const getStates = (elem) => elem.__states

export const getStateUsage = (state) =>
  [state.value, (value) => setStateValue(state, value)]