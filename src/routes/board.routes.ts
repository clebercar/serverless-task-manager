import { Router } from 'express'
import { ListBoards } from '@handles/boards/ListBoards.handle'

const boardRoutes = Router()
const listBoards = new ListBoards()

boardRoutes.get('/', listBoards.handle)

export { boardRoutes }
