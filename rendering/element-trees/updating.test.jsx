import { assertEquals } from "/asserts.ts"
import { assertSpyCallArgs, assertSpyCalls, spy } from "/mock.ts"
import { getHtmlName, registerDOMParser } from "../../rendering-html/mod.js"
import { renderElementTree } from "./rendering.js"
import { updateElementTree } from "./updating.js"
import { setEffects, useEffect, setInitialEffect } from "../../rendering-effects/mod.js";
import { useState } from "../../rendering-states/mod.js";
import { setStates } from "../../mod.js";
import { dispatchEvent } from "../../rendering-events/mod.js";

await registerDOMParser()

Deno.test("use elements => update html elements", async (t) =>
{
  await t.step("elements => update elements => updated html", () => {
    const updateHtml = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx)[0].outerHTML

    assertEquals(updateHtml(<a></a>, <a><b></b></a>), "<a><b></b></a>")
    assertEquals(updateHtml(<a><b></b></a>, <a></a>), "<a></a>")
    assertEquals(updateHtml(<a><b></b></a>, <a><b></b></a>), "<a><b></b></a>")
    assertEquals(updateHtml(<a><b></b></a>, <a><c></c></a>), "<a><c></c></a>")
    assertEquals(updateHtml(<a><b><c></c></b></a>, <a><c></c></a>), "<a><c></c></a>")
    assertEquals(updateHtml(<a><c></c></a>, <a><b><c></c></b></a>), "<a><b><c></c></b></a>")
    assertEquals(updateHtml(<a><b></b><c></c></a>, <a><b><c></c></b></a>), "<a><b><c></c></b></a>")
    assertEquals(updateHtml(<a><b></b><c></c></a>, <a><b><c></c></b></a>), "<a><b><c></c></b></a>")
    assertEquals(updateHtml(<a><b></b><c></c></a>, <a>{[1]}</a>), "<a>1</a>")
    assertEquals(updateHtml(<a>{[1]}</a>, <a><b></b><c></c></a>), "<a><b></b><c></c></a>")
  })

  await t.step("elements with text content => update elements => updated html", () => {
    const updateHtml = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx)[0].outerHTML

    assertEquals(updateHtml(<a>1</a>, <a>2</a>), "<a>2</a>")
    assertEquals(updateHtml(<a>{1}.</a>, <a>{2}.</a>), "<a>2.</a>")
    assertEquals(updateHtml(<a>_{1}.</a>, <a>_{2}.</a>), "<a>_2.</a>")
    assertEquals(updateHtml(<a><b>1</b></a>, <a>1</a>), "<a>1</a>")
    assertEquals(updateHtml(<a><b>1</b></a>, <a><b>2</b></a>), "<a><b>2</b></a>")
    assertEquals(updateHtml(<a><b>1</b></a> ,<a><b>{[2, 3]}</b></a>), "<a><b>23</b></a>")
    assertEquals(updateHtml(<a><b>1</b></a>, <a><b>2<c>3</c></b></a>), "<a><b>2<c>3</c></b></a>")
    assertEquals(updateHtml(<a>1<b></b>2</a>, <a><b><c>3</c>2</b></a>), "<a><b><c>3</c>2</b></a>")
  })

  await t.step("key-elements => update elements => updated html", () => {
    const updateHtml = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx)[0].outerHTML

    assertEquals(updateHtml(<a></a>, <a><b key={1}></b></a>), "<a><b></b></a>")
    assertEquals(updateHtml(<a><b key={1}></b></a>, <a></a>), "<a></a>")
    assertEquals(updateHtml(<a><b key={1}></b></a>, <a><c key={2}></c></a>), "<a><c></c></a>")
    assertEquals(updateHtml(<a><b key={2}></b><c key={1}></c></a>, <a><c key={1}></c></a>), "<a><c></c></a>")
    assertEquals(updateHtml(<a><b key={2}></b></a>, <a><c key={1}></c><b key={2}></b></a>), "<a><c></c><b></b></a>")
    assertEquals(updateHtml(<a><b key={2}></b><c key={1}></c></a>, <a><c key={1}></c><b key={2}></b></a>), "<a><c></c><b></b></a>")
    assertEquals(updateHtml(<a><b key={1}></b><c key={2}></c></a>, <a><d key={3}></d></a>), "<a><d></d></a>")
    assertEquals(updateHtml(<a><b key={3}></b></a>, <a><c key={2}></c><d key={1}></d></a>), "<a><c></c><d></d></a>")
  })

  await t.step("factories => update elements => updated html", () => {
    const updateHtml = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx)[0].outerHTML
    const A = (props) => props.children
    const C = (props) => props.children

    assertEquals(updateHtml(<A></A>, <A><b></b></A>), "<a><b></b></a>")
    assertEquals(updateHtml(<A></A>, <A><C></C></A>), "<a><c></c></a>")
    assertEquals(updateHtml(<A><b></b></A>, <A></A>), "<a></a>")
    assertEquals(updateHtml(<A><C></C></A>, <A></A>), "<a></a>")
    assertEquals(updateHtml(<b><A><c></c></A></b>, <b><A><d></d></A></b>), "<b><a><c></c></a></b>")
    assertEquals(updateHtml(<b><A prop={1}><c></c></A></b>, <b><A prop={1}><d></d></A></b>), "<b><a prop=\"1\"><c></c></a></b>")
    assertEquals(updateHtml(<b><A prop={1}><c></c></A></b>, <b><A prop={2}><d></d></A></b>), "<b><a prop=\"2\"><d></d></a></b>")
    assertEquals(updateHtml(<b><A prop={1}></A></b>, <b><A prop={2}><C></C></A></b>), "<b><a prop=\"2\"><c></c></a></b>")
    assertEquals(updateHtml(<b><A prop={1}><C></C></A></b>, <b><A prop={2}></A></b>), "<b><a prop=\"2\"></a></b>")
  })

  await t.step("key-factories => update factories => updated html", () => {
    const updateHtml = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx)[0].outerHTML
    const A = (props) => props.children

    assertEquals(updateHtml(<b><A key={1}><c></c></A></b>, <b><A key={1}><d></d></A></b>), "<b><a><c></c></a></b>")
    assertEquals(updateHtml(<b><A key={1}><c></c></A></b>, <b><A key={3}><d></d></A></b>), "<b><a><d></d></a></b>")
  })

  await t.step("factories => update elements => reconciled elements", () => {
    const updateNames = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx).map(getHtmlName)

    const A = (props) => props.children
    const C = (props) => props.children
    assertEquals(updateNames(<A></A>, <A><b></b></A>), ["a", "b"])
    assertEquals(updateNames(<A></A>, <A><C></C></A>), ["a", "c"])
    assertEquals(updateNames(<A><b></b></A>, <A></A>), ["a", "b"])
    assertEquals(updateNames(<A><C></C></A>, <A></A>), ["a", "c"])
    assertEquals(updateNames(<A><C></C></A>, <A><C><d></d></C></A>), ["a"])
    assertEquals(updateNames(<b><A><c></c></A></b>, <b><A><d></d></A></b>), ["b"])
    assertEquals(updateNames(<b><A prop={1}><c></c></A></b>, <b><A prop={1}><d></d></A></b>), ["b"])
    assertEquals(updateNames(<b><A prop={1}><c></c></A></b>, <b><A prop={2}><d></d></A></b>), ["b", "a", "d", "c"])
    assertEquals(updateNames(<b><A prop={1}></A></b>, <b><A prop={2}><C></C></A></b>), ["b", "a", "c"])
    assertEquals(updateNames(<b><A prop={1}><C></C></A></b>, <b><A prop={2}></A></b>), ["b", "a", "c"])
  })

  await t.step("style, ignored elements => update elements => elements skipped", () => {
    const updateNames = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx).map(getHtmlName)

    assertEquals(updateNames(<style><b></b></style>, <style><b></b></style>), ["style"])
    assertEquals(updateNames(<a __ignore={["a"]}><b></b></a>, <a><b></b></a>), ["a"])
  })

  await t.step("elements with props => update elements => updated elements props", () => {
    const updateClasses = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx).map(x => x.className)

    assertEquals(updateClasses(<a class="a"></a>, <a class="b"></a>), ["b"])
    assertEquals(updateClasses(<a><b class="a"></b></a>, <a><b class="b"></b></a>), ["", "b"])
  })

  await t.step("factories with props => update factories => updated factories props", () => {
    const updateClasses = (oldJsx, newJsx) => updateElementTree(renderElementTree(oldJsx)[0], newJsx).map(x => x.className)
    const A = (props) => <b class={props.class}></b>

    assertEquals(updateClasses(<A class="a"></A>, <A class="b"></A>), ["b", "b"])
    assertEquals(updateClasses(<c><A class="a"></A></c>, <c><A class="b"></A></c>), ["", "b", "b"])
  })

  await t.step("factory effect => update factory => run effect", async () => {
    const effectSpy = spy(() => {})
    const A = (_, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "", async () => { await Promise.resolve(); isUpdate && effectSpy() })
      return <b></b>
    }
    const $elem = renderElementTree(<A></A>)[0]
    await waitForAsyncs()

    updateElementTree($elem, <A></A>)
    await waitForAsyncs()

    assertSpyCalls(effectSpy, 1)
  })

  await t.step("factory effect => update factory => run async effect after all children updated", async () => {
    const effectSpy = spy(() => {})
    const A = (props, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "", async () => { await Promise.resolve(); isUpdate && effectSpy(elem.outerHTML) })
      return props.children
    }
    const $elem = renderElementTree(<A><b></b></A>)[0]
    await waitForAsyncs()

    updateElementTree($elem, <A><c></c></A>)
    await waitForAsyncs()

    assertSpyCallArgs(effectSpy, 0, ["<a><c></c></a>"])
  })

  await t.step("factories effects => update factories => run effects descending", () => {
    const effectSpy = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "", () => isUpdate && effectSpy("b"))
      return <c></c>
    }
    const A = (props, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "", () => isUpdate && effectSpy("a"))
      return <B {...props}></B>
    }
    const $elem = renderElementTree(<A></A>)[0]
    updateElementTree($elem, <A x={1}></A>)

    assertSpyCallArgs(effectSpy, 0, ["a"])
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("factory sync and async effects => update factory => run sync effects before async effects", async () => {
    const effectSpy = spy(() => {})
    const A = (_, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "a", async () => { await Promise.resolve(); isUpdate && effectSpy("b") })
      useEffect(effects, "b", () => isUpdate && effectSpy("a"))
      return <b></b>
    }
    const $elem = renderElementTree(<A></A>)[0]
    await waitForAsyncs()

    updateElementTree($elem, <A></A>)
    await waitForAsyncs()

    assertSpyCallArgs(effectSpy, 0, ["a"])
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("factories effects => update factories => run pre effect funcs first", () => {
    const effectSpy = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "", () => (effectSpy("a"), setInitialEffect(effects, "", () => effectSpy("b")) ), [])
      return <d></d>
    }
    const A = (props, elem) => props.children
    const $elem = renderElementTree(<A><B></B></A>)[0]
    assertSpyCalls(effectSpy, 1)
    assertSpyCallArgs(effectSpy, 0, ["a"])

    updateElementTree($elem, <A></A>)

    assertSpyCalls(effectSpy, 2)
    assertSpyCallArgs(effectSpy, 1, ["b"])
  })

  await t.step("element throw error => update element => error dispatched", () => {
    const handler = spy(() => {})
    const B = () => { throw new Error('error') }
    const $elem = renderElementTree(<a></a>)[0]

    try { updateElementTree($elem, <a onerror={handler}><B></B></a>) }
    catch { assertSpyCalls(handler, 1) }
  })

  await t.step("element with throw error effect => update element => error dispatched", () => {
    const handler = spy(() => {})
    const B = (_, elem) => {
      const effects = setEffects(elem)
      const isUpdate = elem.children.length
      useEffect(effects, "", () => { if(isUpdate) throw new Error('error') })
      return <c></c>
    }
    const $elem = renderElementTree(<a></a>)[0]

    try { updateElementTree($elem, <a onerror={handler}><B></B></a>) }
    catch { assertSpyCalls(handler, 1) }
  })

  await t.step("element with event handler => update element on event => element updated", () => {
    const A = (_, elem) => {
      const [value, setValue] = useState(setStates(elem), "value", "1", [])
      return <><input value={value} onchange={() => { setValue("2"); updateElementTree(elem, <A></A>) }}></input></>
    }
    const $elem = renderElementTree(<A></A>)[0]
    dispatchEvent($elem.querySelector("input"), "change")

    assertEquals($elem.querySelector("input").value, "2")
  })
})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))
