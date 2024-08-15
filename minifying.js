import "/source-map.js"
import "/terser.ts"

const minifyOptions = ({
  module: true,
  sourceMap: { filename: "index.min.js", url: "index.min.js.map" }
});
const indexPath = new URL("./index.js", import.meta.url)
const fileContent = await Deno.readTextFile(indexPath)
const minifiedContent = await Terser.minify({"index.js": fileContent}, minifyOptions)

const indexMinPath = indexPath.pathname.replace(".js", ".min.js")
const indexMapPath = indexPath.pathname.replace(".js", ".min.js.map")
await Deno.writeTextFile(indexMinPath, minifiedContent.code)
await Deno.writeTextFile(indexMapPath, minifiedContent.map)