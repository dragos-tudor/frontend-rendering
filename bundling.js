import { bundle } from "/emit.ts"

const inputRelativePath = Deno.args[0] ?? "./mod.js"
const outputRelativePath = Deno.args[1] ?? "./index.js"
const inputPath = new URL(inputRelativePath, import.meta.url)
const outputPath = new URL(outputRelativePath, import.meta.url)

const bundleOptions = { compilerOptions: { sourceMap: false } }
const bundleResult = await bundle(inputPath, bundleOptions)
const { code } = bundleResult

Deno.writeTextFileSync(outputPath, code)
