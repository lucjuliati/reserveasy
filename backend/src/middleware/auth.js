import jwt from 'jsonwebtoken'
import db from "../database/index.js"

let cachedUsers = {}

export async function auth(req, res, next) {
    try {
        let user = null
        let authHeader = req.headers.authorization
        let token = authHeader.split(' ')[1]

        let data = jwt.decode(token, process.env.JWT_KEY)
        if (data.id) {
            if ((data.id in cachedUsers)) {
                user = cachedUsers[data.id]
            } else {
                user = await db.from('users').select().eq('id', data.id)

                if (!user) throw new Error
                else user = user?.data?.[0]

                cachedUsers[data.id] = user
            }
        } else {
            throw new Error()
        }

        if (user) {
            delete user.password
            req.user = user
        } else {
            throw new Error()
        }

        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send()
    }
}
