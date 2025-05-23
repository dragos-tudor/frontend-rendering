import { assertEquals } from "/asserts.ts"
import { registerLinkeDomParser } from "../../rendering-html/mod.js"
import { getHtmlName } from "../../rendering-html/mod.js"
import { setEffects, useEffect } from "../../rendering-effects/mod.js"
import { renderElementTree } from "./rendering.js"
import { unrenderElementTree } from "./unrendering.js"

await registerLinkeDomParser()

Deno.test("use elements => unrender html elements", async (t) =>
{
  await t.step("html elements => unrender elements => empty html", () => {
    const unrenderHtml = (jsx) => unrenderElementTree(renderElementTree(jsx)[0])[0].outerHTML

    assertEquals(unrenderHtml(<a>123</a>), "<a></a>")
    assertEquals(unrenderHtml(<a><b>123</b></a>), "<a></a>")
    assertEquals(unrenderHtml(<a><b><c></c></b></a>), "<a></a>")
    assertEquals(unrenderHtml(<a><b></b><c></c></a>), "<a></a>")
    assertEquals(unrenderHtml(<a><b></b>123</a>), "<a></a>")
    assertEquals(unrenderHtml(<a>123<b></b></a>), "<a></a>")
    assertEquals(unrenderHtml(<a><b>1<c></c>2</b></a>), "<a></a>")
  })

  await t.step("html factories => unrender factories => empty html", () => {
    const unrenderHtml = (jsx) => unrenderElementTree(renderElementTree(jsx)[0])[0].outerHTML
    const A = (props) => <b>{props.children}</b>
    const D = (props) => <e>{props.children}</e>

    assertEquals(unrenderHtml(<A><c></c></A>), "<a></a>")
    assertEquals(unrenderHtml(<D><a></a></D>), "<d></d>")
    assertEquals(unrenderHtml(<D><A></A></D>), "<d></d>")
  })

  await t.step("html elements => unrender elements => removed elements", () => {
    const unrenderNames = (jsx) => unrenderElementTree(renderElementTree(jsx)[0]).map(getHtmlName)

    assertEquals(unrenderNames(<a>123</a>), ["a", "text"])
    assertEquals(unrenderNames(<a><b>123</b></a>), ["a", "b", "text"])
    assertEquals(unrenderNames(<a><b><c></c></b></a>), ["a", "b", "c"])
    assertEquals(unrenderNames(<a><b></b><c></c></a>), ["a", "b", "c"])
    assertEquals(unrenderNames(<a><b></b>123</a>), ["a", "b", "text"])
    assertEquals(unrenderNames(<a>123<b></b></a>), ["a", "text", "b"])
    assertEquals(unrenderNames(<a><b>1<c></c>2</b></a>), ["a", "b", "text", "c", "text"])
  })

  await t.step("html factories => unrender factories => removed factories", () => {
    const unrenderNames = (jsx) => unrenderElementTree(renderElementTree(jsx)[0]).map(getHtmlName)

    const A = (props) => <b>{props.children}</b>
    const D = (props) => <e>{props.children}</e>

    assertEquals(unrenderNames(<A><c></c></A>), ["a", "b", "c"])
    assertEquals(unrenderNames(<D><a></a></D>), ["d", "e", "a"])
    assertEquals(unrenderNames(<D><A></A></D>), ["d", "e", "a", "b"])
  })

  await t.step("factory subcribing effects => unrender factory => run unsubcribe effect", async () => {
    const spies = []
    const A = (_, elem) => {
      const effects = setEffects(elem)

      useEffect(effects, "a", () => Promise.resolve(spies.push("a")).then(() => spies.push("b")), [])
      return <b></b>
    }
    const $elem = renderElementTree(<A></A>)[0]
    await waitForAsyncs()

    unrenderElementTree($elem)
    await waitForAsyncs()

    assertEquals(spies, ["a", "b"])
  })

  await t.step("factories effects => unrender factories => run effects descending", () => {
    const spies = []
    const B = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "b", () => spies.push("b"))
      return <c></c>
    }
    const A = (_, elem) => {
      const effects = setEffects(elem)
      useEffect(effects, "a", () => spies.push("a"))
      return <B></B>
    }
    const $elem = renderElementTree(<A></A>)[0]
    unrenderElementTree($elem)

    assertEquals(spies, ["a", "b"])
  })

  await t.step("elem with event handlers => unrender elem => removed event handlers", () => {
    const unrenderElem = (jsx) => unrenderElementTree(renderElementTree(jsx)[0])[0]

    unrenderElem(<a onclick={() => { throw 'event handler not removed'} }></a>)
      .dispatchEvent(new CustomEvent("click", {bubbles: true}))
  })

  await t.step("elem with props => unrender elem => removed props", () => {
    const unrenderElem = (jsx) => unrenderElementTree(renderElementTree(jsx)[0])[0]

    assertEquals(unrenderElem(<a prop={"text"}></a>).prop, undefined)
    assertEquals(unrenderElem(<a prop={{x: 1}}></a>).prop, undefined)
    assertEquals(unrenderElem(<a prop={[1, 2]}></a>).prop, undefined)
    assertEquals(unrenderElem(<a class="test"></a>).className, "")
  })

  await t.step("elem with internals => unrender elem => removed internals", () => {
    const unrenderElem = (jsx) => unrenderElementTree(renderElementTree(jsx)[0])[0]

    const A = (_) => <></>
    assertEquals(unrenderElem(<A></A>).__elem, undefined)
    assertEquals(unrenderElem(<A></A>).__states, undefined)
    assertEquals(unrenderElem(<A></A>).__effects, undefined)
    assertEquals(unrenderElem(<a __log={"x"}></a>).__log, undefined)
    assertEquals(unrenderElem(<a __ignore={"x"}></a>).__ignore, undefined)
  })

  await t.step("style, ignored elements => unrender elements => elements skipped", () => {
    const unrenderNames = (jsx) => unrenderElementTree(renderElementTree(jsx)[0]).map(getHtmlName)

    assertEquals(unrenderNames(<style><b></b></style>), ["style"])
    assertEquals(unrenderNames(<a __ignore={["a"]}><b></b></a>), ["a"])
    assertEquals(unrenderNames(<a __ignore={["b"]}><b><c></c></b></a>), ["a", "b"])
  })
})

const waitForAsyncs = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 0))
