import { Router } from 'express'
import { boardRoutes } from './board.routes'

const routes = Router()

routes.use('/boards', boardRoutes)

export default routes
