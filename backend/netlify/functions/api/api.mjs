import serverless from 'serverless-http'
import app from '../../../src/server'

const handler = serverless(app)
export { handler }
