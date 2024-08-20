import { update } from "../../rendering/mod.js"
import { getErrorPath, getEventDetailError } from "./getting.js"
import { ErrorBoundary } from "./errorboundary.jsx"
import { toStringErrorPath } from "./converting.js";

export const updateErrorBoundary = (elem, event) =>
{
  const error = getEventDetailError(event)
  const path = getErrorPath(event.target, elem)
  return update(elem, <ErrorBoundary error={error?.message} path={toStringErrorPath(path)}/>)
}