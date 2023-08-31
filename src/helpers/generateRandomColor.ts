export function generateRandomColor() {
  const maxVal = 0xffffff // 16777215
  const randomNumber = Math.floor(Math.random() * maxVal)
  const hexRandomNumber = randomNumber.toString(16)
  const randColor = hexRandomNumber.padStart(6)
  return `#${randColor.toUpperCase()}`
}
