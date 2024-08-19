import { setHtmlEventHandler } from "../../rendering-events/mod.js"
import { updateErrorBoundary } from "./updating.jsx"


export const ErrorBoundary = ({path, error, children}, elem) => {
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