
export const setState = (states, state) => states[state.name] = state

export const setStateDeps = (state, deps) => state.deps = deps

export const setStateValue = (state, value) => state.value = value

export const setStates = (elem, states = {}) => elem.__states = elem.__states ?? states