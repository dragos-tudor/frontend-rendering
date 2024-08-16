import { assertObjectMatch as eq } from "/asserts.ts"
import { render, update } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { dispatchEvent, setEventHandler } from "../../rendering-events/mod.js"
import { Context as Producer } from "./Context.js"
import { getContexts } from "./getting.js"
import { setContexts } from "./setting.js"
import { useContext } from "./using.js"


await registerDOMParser()

Deno.test("use shared data => set contexts", async (t) => {

  await t.step("context consumer with producer => render consumer => consumer value equal with producer value", () => {
    const elem = render(<Producer name="x" value="1"><Consumer context="x"></Consumer></Producer>)

    eq(getContexts(elem.querySelector("consumer"))["x"], {value: "1"})
  })

  await t.step("context consumer without producer => render consumer => consumer value is fallback value", () => {
    const elem = render(<Consumer context="x"></Consumer>)

    eq(getContexts(elem)["x"], {value: "fallback"})
  })

  await t.step("context producer => update producer => producer value updated", () => {
    const elem = render(<Producer name="x" value="1"></Producer>)
    update(elem, <Producer name="x" value="2"></Producer>)

    eq(getContexts(elem)["x"], {value: "2"})
  })

  await t.step("context consumers => update producer => all consumers values updated", () => {
    const elem = render(<Producer name="x" value="1"><Consumer context="x"></Consumer><Consumer context="x"></Consumer></Producer>)
    update(elem, <Producer name="x" value="2"><Consumer context="x"></Consumer><Consumer context="x"></Consumer></Producer>)

    eq(getContexts(elem)["x"], {value: "2"})
    eq(getContexts(elem.querySelector("consumer"))["x"], {value: "2"})
    eq(getContexts(elem.querySelectorAll("consumer")[1])["x"], {value: "2"})
  })

  await t.step("context consumers => update one consumer => producer and all consumers values updated", () => {
    const elem = render(<Producer name="x" value="1"><Consumer context="x"></Consumer><Consumer context="x"></Consumer></Producer>)
    dispatchEvent(elem.querySelector("consumer"), "click", "2")

    eq(getContexts(elem)["x"], {value: "2"})
    eq(getContexts(elem.querySelector("consumer"))["x"], {value: "2"})
    eq(getContexts(elem.querySelectorAll("consumer")[1])["x"], {value: "2"})
  })

})

const Consumer = (props, elem) => {
  const contexts = setContexts(elem)
  const [, setContext] = useContext(contexts, props.context, "fallback", elem)

  setEventHandler(elem, "onclick", (event) => setContext(event.detail))
  return <></>
}