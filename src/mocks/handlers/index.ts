import { commentHandlers } from './commentHandlers'
import { groupHandlers } from './groupHandlers'
import { ImageHandlers } from './imageHandlers'
import { authHandlers } from './loginHandlers'
import { notificationHandlers } from './notificationHandlers'
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
  ...ImageHandlers,
  ...notificationHandlers,
]
