
export const setMemo = (states, memo) => states[memo.name] = memo

export const setMemoDeps = (memo, deps) => memo.deps = deps

export const setMemoValue = (memo, value) => memo.value = value
