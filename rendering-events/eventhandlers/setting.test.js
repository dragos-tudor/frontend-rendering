import { assertSpyCalls, spy } from "/mock.ts"
import { parseHtml, registerDOMParser } from "../../rendering-html/mod.js"
import { dispatchEvent } from "../events/dispatching.js"
import { setHtmlEventHandler } from "./setting.js"

await registerDOMParser()

Deno.test("use html components => set event handlers", async (t) => {

  await t.step("event handler => fire event => event handled", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem, "click")

    assertSpyCalls(spyHandler, 1)
  })

  await t.step("event handler => fire events => events handled", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem, "click")
    dispatchEvent(elem, "click")
    dispatchEvent(elem, "click")

    assertSpyCalls(spyHandler, 3)
  })

  await t.step("parent event handler => fire event from child => parent handle event", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div><span></span></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem.children[0], "click")

    assertSpyCalls(spyHandler, 1)
  })

  await t.step("multiple event handlers => fire event => event handled once", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div><span></span></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    setHtmlEventHandler(elem, "onclick", spyHandler)

    dispatchEvent(elem.children[0], "click")
    assertSpyCalls(spyHandler, 1)
  })

  await t.step("multiple event handler => fire event => last event handler handle event", () => {
    const spyHandler = spy(() => {})
    const spyHandlerNext = spy(() => {})
    const elem = parseHtml("<div><span></span></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    setHtmlEventHandler(elem, "onclick", spyHandlerNext)

    dispatchEvent(elem.children[0], "click")
    assertSpyCalls(spyHandler, 0)
    assertSpyCalls(spyHandlerNext, 1)
  })

})