## Frontend UI rendering library
- simplified React-like library.
- Deno-based rendering library [Node-free].
- functional-style library [OOP-free].

### Usage
```javascript
import {render, update, registerLinkeDomParser, setEffects, setStates, useEffect, useState} from "./index.js"

await registerLinkeDomParser()

const getData = async (fetchData) => {
  const response = await fetchData("/api/data.json", { method: "GET" });
  return await response.json()
}

const loadData = async (elem, setData, fetchData) => {
  const data = await getData(fetchData)
  setData(data)
  return update(elem)
}

const renderData = (data) =>
  data.map(item => (<div>{item.value}</div>))

export const App = (props, elem) =>
{
  const fetchData = props["fetch-data"] ?? fetch
  const states = setStates(elem)
  const effects = setEffects(elem)

  const [data, setData] = useState(states, "data", [], [])
  useEffect(effects, "load data", () => loadData(elem, setData, fetchData), [])

  return (
    <main>
      {...renderData(data)}
    </main>
  )
}



const createJsonHeaders = (body) => new Headers({
  "content-length": body? body.length: 0,
  "content-type": "application/json"
  })
const createJsonResponseInit = (body, status) => ({ headers: createJsonHeaders(body), ok: true, status })
const createJsonResponse = (body) => new Response(
  body,
  createJsonResponseInit(body, 200)
)
const data = JSON.stringify([{value: 1}, {value: 2}, {value: 3}])
render(<App fetch-data={() => Promise.resolve(createJsonResponse(data))}></App>, document.body)
```

### Remarks
- Some differences between `rendering` library and Facebook `React`.
  - the html element is already created when jsx factory run [elem parameter].
  - the update is manually invoked by programmer [the states could be modified in batches].
  - there is no virtual DOM.
- Other remarks:
  - the effects run when all html elements are rendered or updated.
  - the initial effects run when each element is unrendered.
- Performance:
  - rendering, updating, unrendering operations have similar performances with `React` library.

### Modules
- *high-level modules*: rendering, rendering-components.
- *low-level modules*: rendering-html, rendering-jsx, rendering-effects, rendering-states, rendering-attrs, rendering-events, rendering-props, rendering-equalities [shared].
- *low-level modules* completely independent ["parallel" modules].

### [Rendering](./rendering/)
- main functionality: rendering engine transform jsx elements to html elements.
- render element tree (`renderElementTree`):
  - create html root element and descendants from jsx factory.
  - append html root element to parent html element.
  - run effects after all elements are rendered.
- update element tree (`updateElementTree`):
  - reconciliate elements: render, update, replace, unrender html elements [breadth-first strategy].
  - run effects after all elements are updated.
- unrender elements tree (`unrenderElementTree`):
  - run initial effects before removing elements.
  - remove and clear html root element and descendants.
- implement ordering html element children with keys.
- errors funcs [handle, dispatch, throw].
- logging funcs [enable, log].

### [Rendering components](./rendering-components/)
- Built-in components library.
- context component: used to shared data between components.
  - `getContexts` get html element contexts.
  - `useContext` set context function set context values for producers and consumers.
- error boundary component: handle errors thrown by jsx factory.
  - handle rendering errors.
  - handle sync effects errors.
  - on errors display error element.
- lazy component: used to lazy load components.
- suspense component: used to toggle visibility for children or fallback elements [preserving children states].
- service component: used on testing to mock service on development.

### [Rendering html](./rendering-html/)
- main functionality: manage html elements and nodes.
- implement creating, rendering, replacing, unrendering, html elements.
- implement creating, rendering, updating, replacing, unrendering html text nodes.
- implement appending, inserting, removing, replacing html nodes.
- use html DOM parser to create html elements and html text nodes.
- export `registerDomParser` and `registerLinkeDomParser` functions to manually register DOMParser.
- security based on owasp security guidance:
  - validate html tag names.
  - validate html element urls poperties.
  - encode js content.
  - encode html content.

### [Rendering jsx](./rendering-jsx/)
- main functionality: manage jsx elements.
- contains jsx factories builder `buildJsxFactoryChildren`.
- implement jsx children sanitizing:
  - replace html fragments.
  - skip boolean, null, undefined values.

### [Rendering effects](./rendering-effects/)
- implement `setEffects`, `getEffects`,`useEffect`, `setInitialEffect` functions.
- `useEffect` func:
  - use effect funcs for layout effects.
  - use async effect funcs for side-effects.
- `setInitialEffect` is used to cover subscribing flows.
  - initial effect func will run before effect func.

### [Rendering states](./rendering-states/)
- implement `setStates`, `useStates`, `useMemo` functions.

### [Jsx runtime](./jsx-runtime/)
- main functionality: compile jsx expressions.
- jsx runtime is independent of rendering library.
- implement `createJsxElement` func (export `jsx`, `jsxs`, `Fragment`).
- implement `createLegacyJsxElement` func registred as `React.createElement` (export `legacyJsx`).
- export `registerReact` function to manually register React for bundled jsx components.
- usage:
```json
{
  # deno.json
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "/jsx"
  }
}
```

```json
{
  # deps.map.json
  "imports": {
    "/jsx/jsx-runtime": "<path to jsx runtime>",
  }
}
```

*SIMPLE ALWAYS MEANS SIMPLE*
