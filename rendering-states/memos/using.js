import { equalArrays as equalDeps } from "../../rendering-equalities/mod.js";
import { createMemo } from "./creating.js";
import { getMemo, getMemoUsage } from "./getting.js"
import { setMemo, setMemoDeps, setMemoValue } from "./setting.js"
import { existsMemo, isDefaultDeps } from "./verifying.js";

export const useMemo = (states, name, func, deps) => {
  if(!existsMemo(states, name)) {
    const memo = setMemo(states, createMemo(name, func(), deps))
    return getMemoUsage(memo)
  }

  const memo = getMemo(states, name)
  if(equalDeps(memo.deps, deps) && !isDefaultDeps(deps))
    return getMemoUsage(memo)

  setMemoDeps(memo, deps)
  setMemoValue(memo, func())
  return getMemoUsage(memo)
}