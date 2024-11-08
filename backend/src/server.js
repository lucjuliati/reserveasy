import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import router from './router.js'
dotenv.config()

const app = express()
// connectDB()

app.use(cors())
app.use(express.json())
app.use('/.netlify/functions/api', router)

const PORT = process.env.PORT || 4005

app.listen(PORT, () => console.info(`running on :${PORT}`))

export default app