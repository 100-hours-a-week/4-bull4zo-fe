import { ApiResponse } from '@/lib/type'

export interface Group {
  groupId: number
  name: string
}
export interface MyGroupNamesData {
  groups: Group[]
  nextCursor: string | null
  hasNext: boolean
  size: number
}

export type MyGroupNamesResponse = ApiResponse<MyGroupNamesData>
