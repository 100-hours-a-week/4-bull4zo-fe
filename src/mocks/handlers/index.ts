import { groupHandlers } from './groupHandlers'
import { authHandlers } from './loginHandlers'
import { userHandlers } from './userHandlers'

export const handlers = [...authHandlers, ...userHandlers, ...groupHandlers]
