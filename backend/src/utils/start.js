import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from '../router.js'
import supabase from '../database/index.js'
dotenv.config()

export default function start(listen = true) {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/.netlify/functions/api', router)

    const PORT = process.env.PORT || 4005

    if (listen) {
        app.listen(PORT, () => console.info(`running on :${PORT}`))
    }

    supabase.schema('reserveasy').from('users').select('*').then(res => {
        console.log(res)
    })

    return app
}



