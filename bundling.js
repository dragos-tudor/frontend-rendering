import { bundle } from "/emit.ts"

const indexUrl = new URL("./mod.js", import.meta.url)
const bundleOptions = { compilerOptions: { sourceMap: false } }
const bundleResult = await bundle(indexUrl, bundleOptions)

const { code } = bundleResult
const lintNonControlRegex = "// deno-lint-ignore-file no-control-regex\n"
// const typesReference = '/// <reference types="./index.d.ts"/>\n'
Deno.writeTextFileSync("./index.js", lintNonControlRegex + code)
