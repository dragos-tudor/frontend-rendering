## Frontend UI rendering library
- simplified React-like library.
- Deno-based rendering library [Node-free].
- functional-style library [OOP-free].

### Usage
```javascript
import {render, update, getEffects, getStates, useEffect, useState}
  from "/scripts/rendering.js"

const getData = async () => {
  const response = await fetch("/api/data.json", { method: "GET" });
  return await response.json()
}

const loadData = async (elem, setData) => {
  const data = await getData(elem, setData)
  setData(data)
  return update(elem)
}

const renderData = (data) =>
  data.map(item => (<div>{item.value}</div>))

export const App = (_, elem) => {
  const states = getStates(elem)
  const effects = getEffects(elem)

  const [data, setData] = useState(states, "data", [], [])
  useEffect(effects, "load data", () => loadData(elem, setData), [])

  return (
    <main>
      {renderData(data)}
    </main>
  )
}

render(<App></App>, document.body)
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
  - rendering and updating operations have similar performances.
  - unrendering operation is 2-times slower [`rendering` library remove each tree element and clean properties, event handlers, internal data].

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
- security based on owasp security guidance:
  - validate html tag names.
  - validate html element urls poperties.
  - encode js content.
  - encode html content.

### [Rendering jsx](./rendering-jsx/)
- main functionality: compile jsx expressions.
- contains jsx expressions compiler `compileJsxExpression` (export `jsx`, `jsxs`, `Fragment`).
- contains jsx legacy expressions compiler `compileLegacyJsxExpression` (export `createElement` and register `React.createElement`).
- contains jsx factories builder `buildJsxFactory`.
- implement jsx children sanitizing:
  - replace html fragments.
  - skip boolean, null, undefined values.

### [Rendering effects](./rendering-effects/)
- implement `getEffects`,`useEffect`, `setInitialEffect` functions.
- `useEffect` func:
  - use effect funcs for layout effects.
  - use async effect funcs for side-effects.
- `setInitialEffect` is used to cover subscribing flows.
  - initial effect func will run before effect func.


### [Rendering states](./rendering-states/)
- implement `getStates`, `useStates`, `useMemo` functions.

*SIMPLE ALWAYS MEANS SIMPLE*