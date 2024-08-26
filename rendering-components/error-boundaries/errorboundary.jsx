import { setHtmlEventHandler, unsetHtmlEventHandler } from "../../rendering-events/mod.js"
import { updateErrorBoundary } from "./updating.jsx"


export const ErrorBoundary = ({path, error, children}, elem) =>
{
  unsetHtmlEventHandler(elem, "onerror")
  setHtmlEventHandler(elem, "onerror", (event) => {
    event.stopPropagation()
    return updateErrorBoundary(elem, event)
  })

  return error?
    <error>
      <span class="path">{`Path: ${path}`}</span>
      <pre class="error">{`Error: ${error}`}</pre>
    </error>:
    children
}