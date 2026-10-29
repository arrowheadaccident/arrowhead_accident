/** fill("Call {phone}", { phone: "(602) 313-1925" }) -> "Call (602) 313-1925". Unknown placeholders stay as they are. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
