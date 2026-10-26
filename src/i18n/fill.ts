/** fill("Call {phone}", { phone: "(623) 400-6362" }) -> "Call (623) 400-6362". Unknown placeholders stay as they are. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
