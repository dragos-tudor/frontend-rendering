import { spy, assertSpyCalls, assertSpyCallArgs } from "/mock.ts"
import { render } from "../../rendering/mod.js"
import { registerDOMParser } from "../../rendering-html/mod.js"
import { getEffects, useEffect } from "../../rendering-effects/mod.js"
import { getService } from "./getting.js"
import { Services } from "./Services.js"

await registerDOMParser()

Deno.test("mock component services => use services", async (t) => {

  await t.step("mock service => render services => mock service available", () => {
    const spyService = spy(() => {})
    const A = (_, elem) => {
      const service = getService(elem, "service")
      const effects = getEffects(elem)
      useEffect(effects, "", () => service("data"), [])
    }
    render(<Services service={spyService}><A></A></Services>)

    assertSpyCalls(spyService, 1)
    assertSpyCallArgs(spyService, 0, ["data"])
  })

  await t.step("no service => render services => fallback service available", () => {
    const spyService = spy(() => {})
    const A = (_, elem) => {
      const service = getService(elem, "service", spyService)
      const effects = getEffects(elem)
      useEffect(effects, "", () => service("data"), [])
    }
    render(<Services><A></A></Services>)

    assertSpyCalls(spyService, 1)
    assertSpyCallArgs(spyService, 0, ["data"])
  })

  await t.step("no services => render element => fallback service available", () => {
    const spyService = spy(() => {})
    const A = (_, elem) => {
      const service = getService(elem, "service", spyService)
      const effects = getEffects(elem)
      useEffect(effects, "", () => service("data"), [])
    }
    render(<A></A>)

    assertSpyCalls(spyService, 1)
    assertSpyCallArgs(spyService, 0, ["data"])
  })

})

