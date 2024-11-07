import server from "../../../src/server"
import serverless from "serverless-http"

const handler = serverless(server)
export { handler }
