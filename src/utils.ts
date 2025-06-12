const ansiRegex = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~])"
  ].join("|"),
  "g"
)

export function clearANSI(str: string): string {
  return str.replace(ansiRegex, "")
}