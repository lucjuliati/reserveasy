import serverless from 'serverless-http'
import start from '../../../src/utils/start'

const app = start(false)
const handler = serverless(app)
export { handler }
