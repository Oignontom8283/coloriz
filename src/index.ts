import chalk from "chalk"
import { clearANSI } from "./utils"

// List of text styles
const textStyles = [
  "reset", "bld", "dim", "italic", "underline", "inverse", "hidden", "strikethrough"
] as const

// Legacy colors are the standard 16/32 colors supported by most terminals.
// They are widely used and recognized in terminal applications.
const colors = [
  "black",    // legacy color (black)
  "red",      // legacy color (red)
  "green",    // legacy color (green)
  "yellow",   // legacy color (yellow)
  "blue",     // legacy color (blue)
  "magenta",  // legacy color (magenta)
  "cyan",     // legacy color (cyan)
  "white",    // legacy color (white)
  "gray",     // legacy color (bright black / grey)

  // EN: Bright colors, also widely supported on modern terminals but also legacy
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright"
] as const

// 3. Couleurs de fond, même principe que couleurs classiques
const bgColors = [
  "bgBlack",    // legacy background color
  "bgRed",      // legacy background color
  "bgGreen",    // legacy background color
  "bgYellow",   // legacy background color
  "bgBlue",     // legacy background color
  "bgMagenta",  // legacy background color
  "bgCyan",     // legacy background color
  "bgWhite",    // legacy background color

  "bgBlackBright",   // bright background colors
  "bgRedBright",
  "bgGreenBright",
  "bgYellowBright",
  "bgBlueBright",
  "bgMagentaBright",
  "bgCyanBright",
  "bgWhiteBright"
] as const

type TextStyle = typeof textStyles[number]
type Color = typeof colors[number]
type BgColor = typeof bgColors[number]

// EN: Typescript global declaration
declare global {
  interface String {
    // Text styles
    reset: string
    bld: string
    dim: string
    italic: string
    underline: string
    inverse: string
    hidden: string
    strikethrough: string

    // Colors - legacy terminal colors (16/32 colors)
    black: string    // legacy color
    red: string      // legacy color
    green: string    // legacy color
    yellow: string   // legacy color
    blue: string     // legacy color
    magenta: string  // legacy color
    cyan: string     // legacy color
    white: string    // legacy color
    gray: string     // legacy color (bright black / grey)

    // Bright colors (legacy bright ANSI colors)
    redBright: string
    greenBright: string
    yellowBright: string
    blueBright: string
    magentaBright: string
    cyanBright: string
    whiteBright: string

    // Background colors (same legacy colors)
    bgBlack: string    // legacy bg color
    bgRed: string      // legacy bg color
    bgGreen: string    // legacy bg color
    bgYellow: string   // legacy bg color
    bgBlue: string     // legacy bg color
    bgMagenta: string  // legacy bg color
    bgCyan: string     // legacy bg color
    bgWhite: string    // legacy bg color

    // Bright background colors (legacy bright ANSI bg colors)
    bgBlackBright: string
    bgRedBright: string
    bgGreenBright: string
    bgYellowBright: string
    bgBlueBright: string
    bgMagentaBright: string
    bgCyanBright: string
    bgWhiteBright: string

    // Clear ANSI codes from string
    clear: string
  }
}

// Mapping chalk
const chalkMap: Record<string, (text: string) => string> = {
  // Text styles
  reset: chalk.reset,
  bold: chalk.bold,
  dim: chalk.dim,
  italic: chalk.italic,
  underline: chalk.underline,
  inverse: chalk.inverse,
  hidden: chalk.hidden,
  strikethrough: chalk.strikethrough,

  // Colors (legacy terminal colors)
  black: chalk.black,
  red: chalk.red,
  green: chalk.green,
  yellow: chalk.yellow,
  blue: chalk.blue,
  magenta: chalk.magenta,
  cyan: chalk.cyan,
  white: chalk.white,
  gray: chalk.gray,

  // Bright colors (legacy bright ANSI colors)
  redBright: chalk.redBright,
  greenBright: chalk.greenBright,
  yellowBright: chalk.yellowBright,
  blueBright: chalk.blueBright,
  magentaBright: chalk.magentaBright,
  cyanBright: chalk.cyanBright,
  whiteBright: chalk.whiteBright,

  // Background colors
  bgBlack: chalk.bgBlack,
  bgRed: chalk.bgRed,
  bgGreen: chalk.bgGreen,
  bgYellow: chalk.bgYellow,
  bgBlue: chalk.bgBlue,
  bgMagenta: chalk.bgMagenta,
  bgCyan: chalk.bgCyan,
  bgWhite: chalk.bgWhite,

  // Bright background colors
  bgBlackBright: chalk.bgBlackBright,
  bgRedBright: chalk.bgRedBright,
  bgGreenBright: chalk.bgGreenBright,
  bgYellowBright: chalk.bgYellowBright,
  bgBlueBright: chalk.bgBlueBright,
  bgMagentaBright: chalk.bgMagentaBright,
  bgCyanBright: chalk.bgCyanBright,
  bgWhiteBright: chalk.bgWhiteBright,
}

// Ajout des propriétés au prototype de String
for (const key in chalkMap) {
  Object.defineProperty(String.prototype, key, {
    get() {
      return chalkMap[key](this.toString())
    },
    configurable: true,
    enumerable: false
  })
}

// Ajout de .clear sur String.prototype
Object.defineProperty(String.prototype, "clear", {
  get() {
    return clearANSI(this.toString())
  },
  configurable: true,
  enumerable: false,
})