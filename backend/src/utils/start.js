import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from '../router.js'
import path from 'path'
dotenv.config()

export default function start(listen = true) {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/.netlify/functions/api', router)
    app.use(express.static(path.join(process.cwd(), 'public')))

    const PORT = process.env.PORT || 4005

    if (listen) {
        app.listen(PORT, () => console.info(`running on :${PORT}`))
    }

    return app
}
