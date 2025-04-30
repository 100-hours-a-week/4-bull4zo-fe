import { groupHandlers } from './groupHandlers'
import { authHandlers } from './loginHandlers'
import { userHandlers } from './userHandlers'
import { votesHandlers } from './voteCardHandlers'

export const handlers = [...authHandlers, ...userHandlers, ...groupHandlers, ...votesHandlers]
