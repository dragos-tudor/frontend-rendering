## Frontend UI rendering library
- Deno-based rendering library [Node-free].
- functional-style library [OOP-free].
- simplified React library version.

### Modules
- high-level: rendering (engine), rendering-elements, rendering-components.
- low-level: rendering-html, rendering-jsx, rendering-effects, rendering-states, support-*.

### [Rendering module](./rendering/)
- main functionality: rendering engine transform jsx elements to html elements.
- render components/elements (`renderElements`):
  - create html root element and descendants from jsx factory.
  - append html root element to parent html element.
  - run sync effects funcs when jsx factory run.
  - run async effects funcs when all tree elements rendered.
- update components/elements (`updateElements`):
  - reconciliate elements: render, update, replace, unrender html elements.
  - run sync effects funcs and start effects funcs when jsx factory run.
  - run async effects funcs when all tree elements updated.
- unrender components/elements (`unrenderElements`):
  - run start effects funcs before removing elements.
  - remove and clear html root element and descendants.
- handle errors [log, dispatch rethrow].

### [Rendering elements module](./rendering-elements/)
- main functionality: manage html elements and html text nodes.
- implement rending, updating, replacing, unrending, logging html elements.
- implement rendering, updating, replacing, unrendering, logging html text nodes.
- implement ordering html elements with keys.

### [Rendering components module](./rendering-components/)
- UI components library.
- context component: used to shared data between components.
  - `getContexts` get html element contexts.
  - `useContext` set context function set context values for producers and consumers.
- error boundary component: handle errors thrown by jsx factory.
  - handle rendering errors.
  - handle sync effects errors.
  - on errors display error element.
- lazy component: used to lazy load components.
- services component: used on testing to mock services.
- suspense component: used to toggle fallback/section on suspense/unsuspense events.

### [Rendering html module](./rendering-html/)
- main functionality: manage html elements.
- implement parsing, creating, setting properties, registering event handlers for html elements.
- implement parsing, creating html text nodes.
- implement appending, inserting, removing, replacing html nodes.
- firing and listening for events.
- security based on owasp security guidance:
  - validate html tag names.
  - validate html element properties names.
  - validate html element urls poperties.
  - encode js content.
  - encode html content.

### [Rendering jsx module](./rendering-jsx/)
- main functionality: compile jsx expressions.
- contains jsx expressions compiler `compileJsxExpression` (export `jsx`, `jsxs`, `Fragment`).
- contains jsx legacy expressions compiler `compileLegacyJsxExpression` (export `createElement` and register `React.createElement`).
- contains jsx factories builder `buildJsxFactory`.
- implement jsx children sanitizing:
  - replace html fragments.
  - skip boolean, null, undefined values.

### [Rendering effects module](./rendering-effects/)
- implement `getEffects`,`useEffect`, `setInitialEffect` functions.
- `useEffect` func:
  - run effect func immediately!
  - use async funcs for side-effects.
  - use sync funcs for (limited) layout effect.
  - async (side-effects) funcs run after all tree elemens are rendered.
- `setInitialEffect` is used to cover subscribing flows.
  - initial func will run at next render before effect func.


### [Rendering states module](./rendering-states/)
- implement `getStates`, `useStates`, `useMemo` functions.

