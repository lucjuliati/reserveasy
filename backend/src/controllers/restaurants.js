import db from "../database/index.js"

const restaurantController = {
    async list(req, res) {
        try {
            let restaurants = await db.from('restaurants').select('*')
            res.status(200).send(restaurants?.data ?? [])
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async addReservation(req, res) {
        try {
            let params = req.params
            let data = req.body
            
            let reservation = await db.from('reservations').insert({
                restaurant: params.id,
                user: req.user.id,
                date: data.date
            }).select()

            if (reservation.status != 201) throw new Error()

            return res.status(201).send(reservation.data)
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async removeReservation(req, res) {
        try {
            let params = req.params
            await db.from('reservations').delete().eq('id', params.id).eq('user', req.user.id)

            return res.status(200).send()
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    }
}

export default restaurantController