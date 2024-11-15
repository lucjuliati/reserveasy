import db from '../database/index.js'
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

            if (user.error) {
                throw new Error('User not found!')
            } else {
                user = user.data[0]
            }

            if (data.password != atob(user.password)) {
                throw new Error("INCORRECT_PASSWORD")
            }

            const token = signJWT(user)
            delete user.password
            return res.status(200).send({ user, token })
        } catch (err) {
            console.error(err)
            return res.status(400).send(err)
        }
    },

    async signUp(req, res) {
        try {
            let data = req.body

            const user = await db.from('users').insert({
                name: data.name,
                email: data.email,
                password: btoa(data.password),
                is_guest: false,
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
            let date = new Date()
            date.setDate(date.getDate() - 1)
            date = date.toLocaleDateString("pt-BR").split("/").reverse().join("-")

            await db.from('users').delete()
                .eq('is_guest', true)
                .lt('created_at', `${date} 23:59:59`)

            const name = `guest_${String(new Date().getTime()).slice(-6)}`
            let user = await db.from('users').insert({ name: name, is_guest: true }).select()

            if (user.error) {
                throw new Error()
            } else {
                user = user.data[0]
            }

            const token = signJWT(user)
            return res.status(201).send({ user, token })
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async getReservations(req, res) {
        try {
            let reservations = await db.from('reservations')
                .select('*, restaurant (id, name, cuisine, image, rating)')
                .eq('user', req.user.id)

            if (reservations.error) throw new Error(reservations.error)

            return res.status(200).send(reservations.data)
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