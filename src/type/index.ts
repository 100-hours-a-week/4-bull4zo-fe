export interface ApiResponse<T> {
  message: string
  data: T | null
}
export type PageNation<Key extends string, T> = {
  // eslint-disable-next-line no-unused-vars
  [key in Key]: T
} & {
  nextCursor: string
  hasNext: boolean
  size: number
}
