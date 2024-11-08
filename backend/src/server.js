import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './router.js'
import database from './db/db.cjs'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/.netlify/functions/api', router)

const PORT = process.env.PORT || 4005

app.listen(PORT, () => console.info(`running on :${PORT}`))

export default app