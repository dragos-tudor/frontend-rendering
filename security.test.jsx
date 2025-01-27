import { assertEquals, assertThrows } from "/asserts.ts"
import { render, update, setStates, useState, setEffects, useEffect, registerLinkeDomParser } from "./mod.js"

await registerLinkeDomParser()

Deno.test("use components => safely render components", async (t) => {

  await t.step("unsafe element => render component => => security error thrown", () => {
    assertThrows(() => render(<script></script>), undefined, 'Unsafe html element.')
  })

  await t.step("unsafe url value => render component => property skipped", () => {
    const actual = render(<a href={"java\nscrip\tt:"}></a>)
    assertEquals(actual.href, "")
  })

  await t.step("unsafe property => render component => property skipped", () => {
    const actual = render(<a innerHTML={"xss"}></a>)
    assertEquals(actual.innerHTML, "")
  })

  await t.step("unsafe event handler => render component => event handler skipped", () => {
    const actual = render(<a onevent={"xss"}></a>)
    assertEquals(actual.onevent, undefined)
  })

})

Deno.test("use components => safely update components", async (t) => {

  await t.step("unsafe event handler => update component => event handler not updated", () => {
    const A = (_, elem) => {
      const state = useState(setStates(elem), "")
      useEffect(setEffects(elem), "", () => update(elem), [])

      return <nested onevent={state}></nested>
    }
    const actual = render(<A></A>)

    assertEquals(actual.querySelector("nested").onevent, undefined)
  })

  await t.step("unsafe url value => update component => property not updated", () => {
    const A = (_, elem) => {
      const [state, setState] = useState(setStates(elem), "")
      useEffect(setEffects(elem), "", () => { setState("javascript:"); update(elem) }, [])

      return <nested src={state}></nested>
    }
    const actual = render(<A></A>)

    assertEquals(actual.querySelector("nested").src, undefined)
  })

  await t.step("unsafe property => update component => property not updated", () => {
    const A = (_, elem) => {
      const [state, setState] = useState(setStates(elem), "")
      useEffect(setEffects(elem), "", () => { setState("xss"); update(elem) }, [])

      return <nested innerHTML={state}></nested>
    }
    const actual = render(<A></A>)

    assertEquals(actual.querySelector("nested").innerHTML, "")
  })

})
