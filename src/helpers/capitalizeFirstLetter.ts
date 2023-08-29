export function capitalizeFirstLetter(str: string): string {
  const arr = str.split(/ |_/)
  return arr.map(str => str.replace(/^\w/, c => c.toUpperCase())).join(' ')
}
