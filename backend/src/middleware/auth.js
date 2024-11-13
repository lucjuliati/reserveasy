import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
    try {
        let authHeader = req.headers.authentication
        let token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_KEY)

        next()
    } catch (err) {

    }
}
