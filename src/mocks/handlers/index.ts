import { authHandlers } from './auth'
import { placesHandlers } from './places'
import { moviesHandlers } from './movies'
import { authPhotosHandlers } from './authPhotos'
import { feedHandlers } from './feed'
import { aiVerifyHandlers } from './aiVerify'

export const handlers = [
  ...authHandlers,
  ...placesHandlers,
  ...moviesHandlers,
  ...authPhotosHandlers,
  ...feedHandlers,
  ...aiVerifyHandlers,
]
