import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
// import authRoutes from './routes/authRoutes.js'
// import reservationRoutes from './routes/reservationRoutes.js'
import router from './router.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// connectDB()

app.use(cors())
app.use(express.json())

// app.use('/api/auth', authRoutes)
// app.use('/api/reservations', reservationRoutes)

app.use('/restaurants', router)
app.use(errorHandler)

app.get("/hello", (req, res) => res.send("Hello World!"))

app.use("./netlify/functions/api", router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app