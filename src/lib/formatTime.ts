export default function formatTime(timeStamp: string): string {
  const now = Date.now()
  const date = new Date(timeStamp)
  const diff = now - date.getTime()

  const year = date.getFullYear()
  const currentYear = new Date().getFullYear()

  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  if (diff >= 0) {
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}분 전`
    } else if (diff < 4 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      return `${hours}시간 전`
    } else {
      if (year === currentYear) {
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      } else {
        return `${year.toString().slice(2)}${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      }
    }
  } else {
    const futureDiff = -diff
    if (futureDiff < 60 * 60 * 1000) {
      const minutes = Math.ceil(futureDiff / (1000 * 60))
      return `${minutes}분 후 종료`
    } else if (futureDiff < 24 * 60 * 60 * 1000) {
      const hours = Math.ceil(futureDiff / (1000 * 60 * 60))
      return `${hours}시간 후 종료`
    } else {
      const days = Math.ceil(futureDiff / (1000 * 60 * 60 * 24))
      return `${days}일 후 종료`
    }
  }
}

export function formatTimeDetail(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  const isThisYear = year === now.getFullYear()

  if (isThisYear) {
    return `${month}/${day} ${hour}:${minute}`
  } else {
    return `${year}/${month}/${day} ${hour}:${minute}`
  }
}
