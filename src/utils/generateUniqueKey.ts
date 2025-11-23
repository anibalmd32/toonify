export function generateUniqueKey(): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  const timestampPart = Date.now().toString(36);

  return `key-${timestampPart}-${randomPart}`;
}
