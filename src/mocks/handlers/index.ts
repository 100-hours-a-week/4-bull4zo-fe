import { commentHandlers } from './commentHandlers'
import { groupHandlers } from './groupHandlers'
import { authHandlers } from './loginHandlers'
import { researchHandlers } from './researchHandlers'
import { userHandlers } from './userHandlers'
import { votesHandlers } from './voteCardHandlers'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...groupHandlers,
  ...votesHandlers,
  ...researchHandlers,
  ...commentHandlers,
]
