export function capitalize(input: string) {
  return input.toLowerCase().replace(/^./, input[0].toUpperCase())
}
