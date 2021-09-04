import {mathjax} from "mathjax-full/js/mathjax.js"
import {TeX} from "mathjax-full/js/input/tex.js"
import {MathML} from "mathjax-full/js/input/mathml"
// import {AsciiMath} from "mathjax-full/js/input/asciimath"
import {SVG} from "mathjax-full/js/output/svg.js"
import {browserAdaptor} from "mathjax-full/js/adaptors/browserAdaptor"
import {RegisterHTMLHandler} from "mathjax-full/js/handlers/html.js"
import {AllPackages} from "mathjax-full/js/input/tex/AllPackages.js"

const adaptor = browserAdaptor()
RegisterHTMLHandler(adaptor)

type TeXMacros = {[key: string]: string | [string, number]}

type MathJaxOptions = {
  convert?: {
    format?: string
    /** a boolean specifying whether the math is in display-mode or not (for TeX input). Default is true. */
    display?: boolean
    end?: number
    /** a number giving the number of pixels in an ex for the surrounding font. Default is 8. */
    ex?: number
    /** a number giving the number of pixels in an em for the surrounding font. Default is 16. */
    em?: number
    /** a number giving the width of the container, in pixels. Default is 80 times the ex value. */
    containerWidth?: number
    /**  a number giving the line-breaking width in em units. Default is a very large number (100000), so effectively no line breaking. */
    lineWidth?: number
    /** global scaling factor for this expressions */
    scale?: number
    /** family to use if OutputOptions.mtextInheritFont is true  */
    family?: string
  }
  svg?: {
    /** global scaling factor for all expressions */
    scale?: number
    /** smallest scaling factor to use */
    minScale?: number
    /** true to make mtext elements use surrounding font */
    mtextInheritFont?: boolean
    /** true to make merror text use surrounding font */
    merrorInheritFont?: boolean
    /** font to use for mtext, if not inheriting (empty means use MathJax fonts) */
    mtextFont?: string
    /** font to use for merror, if not inheriting (empty means use MathJax fonts) */
    merrorFont?: string
    /** true for MathML spacing rules, false for TeX rules */
    mathmlSpacing?: boolean
    /** RFDa and other attributes NOT to copy to the output */
    skipAttributes?: any
    /** default size of ex in em units */
    exFactor?: number
    /** default for indentalign when set to 'auto' */
    displayAlign?: string
    /** default for indentshift when set to 'auto' */
    displayIndent?: string
    /** The wrapper factory to use */
    wrapperFactory?: null
    /** The FontData object to use */
    font?: null
    /** The CssStyles object to use */
    cssStyles?: null
    /** insert <title> tags with speech content */
    internalSpeechTitles?: boolean
    /** initial id number to use for aria-labeledby titles */
    titleID?: number
    /** or 'global' or 'none' */
    fontCache?: "global" | "local"
    /** ID to use for local font cache (for single equation processing) */
    localID?: any
  }
}

type RGB = [R: number, G: number, B: number]

export function tex2svg(formula: string, color: RGB, mathjax_options: MathJaxOptions = {}, macros: TeXMacros = {}): HTMLElement {
  const tex = new TeX({packages: AllPackages, macros})
  const svg = new SVG({fontCache: "local", ...mathjax_options.svg})
  const tex_to_svg = mathjax.document("", {InputJax: tex, OutputJax: svg})
  return tex_to_svg.convert(`{\\color[RGB]{${color.join(", ")}} ${formula}}`, mathjax_options.convert)
}

export function ascii2svg(_formula: string, _color: RGB, _mathjax_options: MathJaxOptions = {}): HTMLElement {
  // TODO:
  // const ascii = new AsciiMath({})
  // const ascii_to_svg = mathjax.document("", {InputJax: ascii, OutputJax: svg})
  // return ascii_to_svg.convert(formula, options)
  throw new Error("not implemented")
}

export function mathml2svg(formula: string, color: RGB, mathjax_options: MathJaxOptions = {}): HTMLElement {
  const mathml = new MathML({})
  const svg = new SVG({fontCache: "local", ...mathjax_options.svg})
  const mathml_to_svg = mathjax.document("", {InputJax: mathml, OutputJax: svg})
  return mathml_to_svg.convert(`{\\color[RGB]{${color.join(", ")}} ${formula}}`, mathjax_options.convert)
}
