import { app } from './app'
import serverlessHttp from 'serverless-http'

export const handler = serverlessHttp(app)
