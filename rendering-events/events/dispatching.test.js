import { assertSpyCalls, spy } from "/mock.ts"
import { parseHtml, registerLinkeDomParser } from "../../rendering-html/mod.js"
import { setHtmlEventHandler } from "../handlers/setting.js"
import { dispatchEvent } from "./dispatching.js"
import { unsetHtmlEventHandler } from "../handlers/unsetting.js";

await registerLinkeDomParser()

Deno.test("use html components => dispatch and handle events", async (t) => {

  await t.step("event handler => dispatch event => event handled", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem, "click")

    assertSpyCalls(spyHandler, 1)
  })

  await t.step("event handler => dispatch events => events handled", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem, "click")
    dispatchEvent(elem, "click")
    dispatchEvent(elem, "click")

    assertSpyCalls(spyHandler, 3)
  })

  await t.step("parent event handler => dispatch event from child => parent handle event", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div><span></span></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    dispatchEvent(elem.children[0], "click")

    assertSpyCalls(spyHandler, 1)
  })

  await t.step("set same event handlers multiple times => dispatch event => event handled once", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    setHtmlEventHandler(elem, "onclick", spyHandler)

    dispatchEvent(elem, "click")
    assertSpyCalls(spyHandler, 1)
  })

  await t.step("set different event handlers multiple times => dispatch event => all event handlers handle event", () => {
    const spyHandler = spy(() => {})
    const spyHandlerNext = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    setHtmlEventHandler(elem, "onclick", spyHandlerNext)

    dispatchEvent(elem, "click")
    assertSpyCalls(spyHandler, 1)
    assertSpyCalls(spyHandlerNext, 1)
  })

  await t.step("unset event handler => dispatch event => event not handled", () => {
    const spyHandler = spy(() => {})
    const elem = parseHtml("<div></div>")
    setHtmlEventHandler(elem, "onclick", spyHandler)
    unsetHtmlEventHandler(elem, "onclick")

    dispatchEvent(elem, "click")
    assertSpyCalls(spyHandler, 0)
  })
})