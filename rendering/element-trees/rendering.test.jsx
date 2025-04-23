import { assertEquals, assertNotStrictEquals, assertStrictEquals } from "/asserts.ts"
import { assertSpyCalls, assertSpyCallArgs, spy } from "/mock.ts"
import { registerLinkeDomParser } from "../../rendering-html/mod.js"
import { setEffect, setEffects, useEffect } from "../../rendering-effects/mod.js"
import { dispatchEvent } from "../../rendering-events/mod.js"
import { getHtmlName } from "../../rendering-html/mod.js"
import { renderElementTree } from "./rendering.js"


await registerLinkeDomParser()

Deno.test("use elements => render jsx elements", async (t) =>
{
  await t.step("jsx elements => render elements => rendered html", () => {
    const renderHtml = (jsx) => renderElementTree(jsx)[0].outerHTML

    assertEquals(renderHtml(<a>{0}</a>), "<a>0</a>")
    assertEquals(renderHtml(<a>{"0"}</a>), "<a>0</a>")
    assertEquals(renderHtml(<a>123</a>), "<a>123</a>")
    assertEquals(renderHtml(<a>{123}.</a>), "<a>123.</a>")
    assertEquals(renderHtml(<a><b>123</b></a>), "<a><b>123</b></a>")
    assertEquals(renderHtml(<a><b><c></c></b></a>), "<a><b><c></c></b></a>")
    assertEquals(renderHtml(<a><b></b><c></c></a>), "<a><b></b><c></c></a>")
    assertEquals(renderHtml(<a><b></b>123</a>), "<a><b></b>123</a>")
    assertEquals(renderHtml(<a>123<b></b></a>), "<a>123<b></b></a>")
    assertEquals(renderHtml(<a><b>1<c></c>2</b></a>), "<a><b>1<c></c>2</b></a>")

    assertEquals(renderHtml(<a>{""}</a>), "<a></a>")
    assertEquals(renderHtml(<a>{true}</a>), "<a></a>")
    assertEquals(renderHtml(<a>{false}</a>), "<a></a>")
    assertEquals(renderHtml(<a>{null}</a>), "<a></a>")
    assertEquals(renderHtml(<a>{undefined}</a>), "<a></a>")
  })

  await t.step("jsx factories => render factories => rendered html", () => {
    const renderHtml = (jsx) => renderElementTree(jsx)[0].outerHTML
    const A = (props) => <b>{props.children}</b>
    const C = (props) => <A>{props.children}</A>

    assertEquals(renderHtml(<A></A>), "<a><b></b></a>")
    assertEquals(renderHtml(<C><d></d></C>), "<c><a><b><d></d></b></a></c>")
  })

  await t.step("jsx elements => render elements => appended elements", () => {
    const renderNames = (jsx) => renderElementTree(jsx).map(getHtmlName)

    assertEquals(renderNames(<a>123</a>), ["a", "text"])
    assertEquals(renderNames(<a><b>123</b></a>), ["a", "b", "text"])
    assertEquals(renderNames(<a><b><c></c></b></a>), ["a", "b", "c"])
    assertEquals(renderNames(<a><b></b><c></c></a>), ["a", "b", "c"])
    assertEquals(renderNames(<a><b></b>123</a>), ["a", "b", "text"])
    assertEquals(renderNames(<a>123<b></b></a>), ["a", "text", "b"])
    assertEquals(renderNames(<a><b>1<c></c>2</b></a>), ["a", "b", "text", "c", "text"])
  })

  await t.step("jsx factories => render factories => appended factories", () => {
    const renderNames = (jsx) => renderElementTree(jsx).map(getHtmlName)
    const A = (props) => <b>{props.children}</b>
    const C = (props) => <A>{props.children}</A>

    assertEquals(renderNames(<A></A>), ["a", "b"])
    assertEquals(renderNames(<C><d></d></C>), ["c", "a", "b", "d"])
  })

  await t.step("factory effect => render factory => run effect", async () => {
    const effectSpy = spy(() => {})
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => Promise.resolve(effectSpy()))
      return <b></b>
    }
    renderElementTree(<A></A>)
    await waitForAsyncs()

    assertSpyCalls(effectSpy, 1)
  })

  await t.step("factories effects => render factories => run effects descending", async () => {
    const effectSpy = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => Promise.resolve(effectSpy("b")) )
      return <c></c>
    }
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => Promise.resolve(effectSpy("a")) )
      return <B></B>
    }
    renderElementTree(<A></A>)
    await waitForAsyncs()

    assertSpyCalls(effectSpy, 2)
    assertSpyCallArgs(effectSpy, 0, ["a"])
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("factory effect => render factory => run async effect after all children rendered", async () => {
    const effectSpy = spy(() => {})
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => runAsync(() => effectSpy(elem.outerHTML)))
      return <b><c></c></b>
    }
    renderElementTree(<A></A>)
    await waitForAsyncs()

    assertSpyCallArgs(effectSpy, 0, ["<a><b><c></c></b></a>"])
  })

  await t.step("factories effects => render factories => run effects descending", () => {
    const effectSpy = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => effectSpy("b"))
      return <c></c>
    }
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => effectSpy("a"))
      return <B></B>
    }
    renderElementTree(<A></A>)

    assertSpyCalls(effectSpy, 2)
    assertSpyCallArgs(effectSpy, 0, ["a"])
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("factory sync and async effect => render factory => run sync effect before async effect", async () => {
    const effectSpy = spy(() => {})
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "b", async () => { await Promise.resolve(); effectSpy("b") })
      useEffect(effects, "a", () => effectSpy("a"))
      return <b></b>
    }
    renderElementTree(<A></A>)
    await waitForAsyncs()

    assertSpyCalls(effectSpy, 2)
    assertSpyCallArgs(effectSpy, 0, ["a"])
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("element event handlers => render element => event handlers registered", () => {
    const handler = spy(() => {})
    const A = () => <b onclick={handler}></b>
    const $elem = renderElementTree(<A></A>)[0]

    dispatchEvent($elem.querySelector("b"), "click")
    assertSpyCalls(handler, 1)
  })

  await t.step("factory event handlers => render factory => event handlers registered", () => {
    const handler = spy(() => {})
    const A = () => <b></b>
    const $elem = renderElementTree(<A onclick={handler}></A>)[0]

    dispatchEvent($elem.querySelector("b"), "click")
    assertSpyCalls(handler, 1)
  })

  await t.step("element properties => render element => properties set", () => {
    const A = () => <b class="a"></b>
    const $elem = renderElementTree(<A class="a"></A>)[0]

    assertEquals($elem.className, "a")
    assertEquals($elem.querySelector("b").className, "a")
  })

  await t.step("element throw error => render element => error dispatched", () => {
    const handler = spy(() => {})
    const B = () => { throw new Error('error') }

    try { renderElementTree(<a onerror={handler}><B></B></a>) }
    catch { assertSpyCalls(handler, 1) }
  })

  await t.step("element with effect throw error => render element => error dispatched", () => {
    const handler = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem, 1)
      setEffect(effects[0], () => { throw new Error('error') })
    }

    try { renderElementTree(<a onerror={handler}><B></B></a>); throw "effect should throw error"; }
    catch { assertSpyCalls(handler, 1) }
  })

  await t.step("style element with css prop => render element => style content with css prop", () => {
    const $elem = renderElementTree(<style css="div { color: green; }"></style>)[0]
    assertEquals($elem.outerHTML, "<style>div { color: green; }</style>")
  })

  await t.step("style element with css content => render element => style content ignored", () => {
    const $elem = renderElementTree(<style>{"div { color: green; }"}</style>)[0]
    assertEquals($elem.outerHTML, "<style></style>")
  })

  await t.step("style, portal, ignored elements => render elements => elements skipped", () => {
    const renderNames = (jsx) => renderElementTree(jsx).map(getHtmlName)
    const Portal = () => {}

    assertEquals(renderNames(<style><b></b></style>), ["style"])
    assertEquals(renderNames(<Portal><b></b></Portal>), ["portal"])
    assertEquals(renderNames(<a __ignore={["a"]}><b></b></a>), ["a"])
    assertEquals(renderNames(<a __ignore={["b"]}><b><c></c></b></a>), ["a", "b"])
  })

  await t.step("elem => render elem => elem descendants have same document", () => {
    const A = (props) => props.children
    const elem = renderElementTree(<A><b><c></c></b></A>)[0]

    assertStrictEquals(elem.ownerDocument, elem.querySelector("b").ownerDocument)
    assertStrictEquals(elem.ownerDocument, elem.querySelector("c").ownerDocument)
  })

  await t.step("elems without parent => render elems => each elem have different document [testing purpose]", () => {
    const A = (props) => props.children
    const elem1 = renderElementTree(<A><b></b></A>)[0]
    const elem2 = renderElementTree(<A><b></b></A>)[0]

    assertNotStrictEquals(elem1.ownerDocument, elem2.ownerDocument)
    assertNotStrictEquals(elem1.querySelector("b").ownerDocument, elem2.querySelector("b").ownerDocument)
  })

  await t.step("factories with underscore names => render factories => html elements with hyphens names", () => {
    const A_B = (_) => <></>
    assertEquals(renderElementTree(<A_B></A_B>)[0].outerHTML, "<a-b></a-b>")
  })

})

const runAsync = (func) =>
  new Promise((resolve) => setTimeout(() => (func(), resolve(), 0) ))

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))