export const convertToKstISOString = (timestamp: string) => {
  const date = new Date(timestamp)
  date.setHours(date.getHours() + 9)
  return date.toISOString()
}
