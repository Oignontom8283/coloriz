import chalk from "chalk"
import { clearANSI } from "./utils"

// Text styles Map (not including bold, which is aliased to bld)
const textStyles = [
  "reset", "dim", "italic", "underline", "inverse", "hidden", "strikethrough"
] as const

// Text colors Map
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

  // Bright text colors. (Also widely supported on modern terminals but also legacy)
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright"
] as const

// Background colors Map
const bgColors = [
  "bgBlack",    // legacy background color
  "bgRed",      // legacy background color
  "bgGreen",    // legacy background color
  "bgYellow",   // legacy background color
  "bgBlue",     // legacy background color
  "bgMagenta",  // legacy background color
  "bgCyan",     // legacy background color
  "bgWhite",    // legacy background color

  // bright background colors
  "bgBlackBright",   
  "bgRedBright",
  "bgGreenBright",
  "bgYellowBright",
  "bgBlueBright",
  "bgMagentaBright",
  "bgCyanBright",
  "bgWhiteBright"
] as const

// Typescript global declaration
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
    clearANSI: string

    // Methods
    rgb: (red:number, green:number, blue:number) => string,
    hex: (hexColor:`#${string}`) => string,
    ansi256: (index:number) => string,

    bgRgb: (red:number, green:number, blue:number) => string,
    bgHex: (hexColor:`#${string}`) => string,
    bgAnsi256: (index:number) => string,

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

// Add propperties to String global prototype
for (const key in chalkMap) {
  Object.defineProperty(String.prototype, key, {
    get() {
      return chalkMap[key](this.toString())
    },
    configurable: true,
    enumerable: false
  })
}


// Define other methods for RGB, HEX, and ANSI256

// Define bold method on String prototype
Object.defineProperty(String.prototype, "bld", { 
  get() {
    return chalk.bold(this.toString())
  },
  configurable: true,
  enumerable: false
})

// For text colors
Object.defineProperty(String.prototype, "rgb", { // Method for RGB text color
  value(red: number, green: number, blue: number) {
    return chalk.rgb(red, green, blue)(this.toString())
  },
  configurable: true,
  enumerable: false
})
Object.defineProperty(String.prototype, "hex", { // Method for HEX text color
  value(hexColor: `#${string}`) {
    return chalk.hex(hexColor)(this.toString())
  },
  configurable: true,
  enumerable: false
})
Object.defineProperty(String.prototype, "ansi256", { // Method for ANSI 256 text color
  value(index: number) {
    return chalk.ansi256(index)(this.toString())
  },
  configurable: true,
  enumerable: false
})

// For background colors
Object.defineProperty(String.prototype, "bgRgb", { // Method for RGB background color
  value(red: number, green: number, blue: number) {
    return chalk.bgRgb(red, green, blue)(this.toString())
  },
  configurable: true,
  enumerable: false
})
Object.defineProperty(String.prototype, "bgHex", { // Method for HEX background color
  value(hexColor: `#${string}`) {
    return chalk.bgHex(hexColor)(this.toString())
  },
  configurable: true,
  enumerable: false
})
Object.defineProperty(String.prototype, "bgAnsi256", { // Method for ANSI 256 background color
  value(index: number) {
    return chalk.bgAnsi256(index)(this.toString())
  },
  configurable: true,
  enumerable: false
})


// Define clearANSI method on String prototype
Object.defineProperty(String.prototype, "clearANSI", {
  get() {
    return clearANSI(this.toString())
  },
  configurable: true,
  enumerable: false,
})

export { chalk }