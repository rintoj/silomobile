export function unique<T>(array?: T[], property: keyof T = 'id' as any): T[] {
  return Object.values(Object.fromEntries(array?.map((item: T) => [item[property], item]) ?? []))
}
