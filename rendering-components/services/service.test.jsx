import { assertEquals } from "/asserts.ts"
import { render } from "../../rendering/mod.js"
import { registerLinkeDomParser } from "../../rendering-html/mod.js"
import { getServices } from "./getting.js"
import { useService } from "./using.js"
import { Service } from "./service.js"

await registerLinkeDomParser()

Deno.test("mock component service => use service", async (t) =>
{
  await t.step("service => render service => service registered", () => {
    const elem = render(<Service name="test" value={console.log}></Service>)

    assertEquals(useService(getServices(elem), "test"), console.log)
  })

  await t.step("service => render service twice => last service registered", () => {
    const elem = render(<Service name="test" value={console.log}></Service>)
    render(<Service name="test" value={console.info}></Service>, elem.parentElement)

    assertEquals(useService(getServices(elem), "test"), console.info)
  })

  await t.step("services => render services => services registered", () => {
    const elem = render(
      <services>
        <Service name="test1" value={console.log}></Service>
        <Service name="test2" value={console.info}></Service>
      </services>)

    assertEquals(useService(getServices(elem), "test1"), console.log)
    assertEquals(useService(getServices(elem), "test2"), console.info)
  })
})

