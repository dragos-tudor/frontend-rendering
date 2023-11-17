import { setMemoValue } from "./setting.js";

export const getMemo = (memos, name) => memos[name]

export const getMemoUsage = (memo) => [memo.value, (func) => setMemoValue(memo, func())]