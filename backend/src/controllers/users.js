import db from '../database/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

function signJWT(data) {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '3d' })
}

const userController = {
    async login(req, res) {
        try {
            let data = req.body
            let user = await db.from('users')
                .select('id, email, name, password')
                .eq('email', data?.email)
                .eq('is_guest', false)

            if (!user) {
                throw new Error('User not found!')
            } else {
                user = user.data[0]
            }

            const token = signJWT(user)

            delete user.password
            return res.status(200).send({ user, token })
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async signUp(req, res) {
        try {
            let data = req.body
            let password = null

            await new Promise((r, _) => setTimeout(async () => {
                await bcrypt.genSalt(8, async function (err, salt) {
                    await bcrypt.hash(data.password, salt, async (err, hash) => {
                        if (err) throw new Error(err)

                        password = hash
                        r(hash)
                    })
                })
            }, 750))

            if (!password) throw new Error()

            const user = await db.from('users').insert({
                name: data.name,
                email: data.email,
                is_guest: false,
                password
            }).select()

            const token = signJWT(user.data)

            return res.status(201).send({ user: user.data, token: token })
        } catch (err) {
            console.error(err)
            return res.status(400).send(err?.message)
        }
    },

    async createGuest(req, res) {
        try {
            const name = `guest_${String(new Date().getTime()).slice(-6)}`
            let user = await db.from('users').insert({ name: name, is_guest: true }).select()

            const token = signJWT(user?.data)

            return res.status(201).send({ user: user?.data, token })
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async getUsers(req, res) {
        try {
            let users = await db.from('users').select('*')
            res.status(200).send(users?.data ?? [])
        } catch (err) {
            console.error(err)
            return res.status(400).send(err)
        }
    }
}

export default userController