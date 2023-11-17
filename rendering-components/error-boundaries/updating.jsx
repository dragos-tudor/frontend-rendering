import { update } from "../../rendering/mod.js"
import { getErrorPath } from "./getting.js"
import { ErrorBoundary } from "./ErrorBoundary.jsx"

export const updateErrorBoundary = (elem, event) =>
{
  const path = getErrorPath(elem, event.target)
  const error = event.detail?.error
  return update(elem, <ErrorBoundary path={path} error={error?.message}/>)
}