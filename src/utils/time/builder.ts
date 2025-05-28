type LocalTimeOptions = {
  date?: Date
  days?: number
  hours?: number
  minutes?: number
}

export const buildLocalDateTimeString = ({
  date = new Date(),
  days = 0,
  hours,
  minutes,
}: LocalTimeOptions = {}) => {
  const targetDate = new Date(date)

  targetDate.setDate(targetDate.getDate() + days)

  if (hours !== undefined) targetDate.setHours(hours)
  if (minutes !== undefined) targetDate.setMinutes(minutes)

  targetDate.setSeconds(0)
  targetDate.setMilliseconds(0)

  const pad = (num: number) => String(num).padStart(2, '0')

  const localYear = targetDate.getFullYear()
  const localMonth = pad(targetDate.getMonth() + 1)
  const localDate = pad(targetDate.getDate())
  const localHours = pad(targetDate.getHours())
  const localMinutes = pad(targetDate.getMinutes())

  return `${localYear}-${localMonth}-${localDate}T${localHours}:${localMinutes}`
}
