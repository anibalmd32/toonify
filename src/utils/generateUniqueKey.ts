export function generateUniqueKey(id: string | number = ""): string {
  return `${id}-${crypto.randomUUID()}`;
}
