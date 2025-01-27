import { assertEquals, assertStringIncludes, assertExists } from "/asserts.ts"
import { render, update } from "../../rendering/mod.js"
import { registerLinkeDomParser } from "../../rendering-html/mod.js"
import { ErrorBoundary } from "./errorboundary.jsx"

await registerLinkeDomParser()

Deno.test("handle layout errors => use error-boundaries", async (t) => {

  await t.step("elements non-throwing errors => render elements inside error boundary => rendered elements", () => {
    const actual = render(<ErrorBoundary><a></a></ErrorBoundary>)

    assertExists(actual.querySelector("a"))
    assertNotExists(actual.querySelector("error"))
  })

  await t.step("element throwing error => render element inside error boundary => unrendered throwing error element", () => {
    const A = (_) => { throw new Error("err") }
    const actual = render(<ErrorBoundary></ErrorBoundary>)
    try { update(actual, <ErrorBoundary><A></A></ErrorBoundary>) }
    catch{
      assertNotExists(actual.querySelector("A"))
    }
  })

  await t.step("element throwing error => render element inside error boundary => rendered error details", () => {
    const A = (_) => { throw new Error("err") }
    const actual = render(<ErrorBoundary></ErrorBoundary>)
    try { update(actual, <ErrorBoundary><A></A></ErrorBoundary>) }
    catch{
      assertStringIncludes(actual.querySelector(".path").textContent, "Path: errorboundary/a")
      assertStringIncludes(actual.querySelector(".error").textContent, "Error: err")
    }
  })

  await t.step("nested element throwing error => render element inside error boundary => rendered error details", () => {
    const A = (props) => props.children
    const B = () => { throw new Error("err") }
    const actual = render(<ErrorBoundary></ErrorBoundary>)
    try { update(actual, <ErrorBoundary><A><B></B></A></ErrorBoundary>) }
    catch {
      assertStringIncludes(actual.querySelector(".path").textContent, "Path: errorboundary/a/b")
      assertStringIncludes(actual.querySelector(".error").textContent, "Error: err")
    }
  })
})

const assertNotExists = (actual) =>
  assertEquals(actual?.tagName, undefined, `Expected ${actual?.tagName} to not exists.`)
