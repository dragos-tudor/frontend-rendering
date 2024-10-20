import { isRenderReconciliation, isReplaceReconciliation, isUnrenderReconciliation, isUpdateReconciliation } from "./verifying.js"

export const ReconciliationTypes = Object.freeze({
  render: 0, update: 1, replace: 2, unrender: 3, skip: 4
})

export const getReconciliationType = (elem, $elem) =>
{
  if (isRenderReconciliation(elem, $elem)) return ReconciliationTypes.render
  if (isUnrenderReconciliation(elem, $elem)) return ReconciliationTypes.unrender
  if (isReplaceReconciliation(elem, $elem)) return ReconciliationTypes.replace
  if (isUpdateReconciliation(elem, $elem)) return ReconciliationTypes.update
  return ReconciliationTypes.skip
}