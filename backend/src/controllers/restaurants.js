import db from "../database/index.js"

const restaurantController = {
    async list(req, res) {
        try {
            if (req.user) {
                let restaurants = await db.from('restaurants')
                    .select('*, reservations (id, user, date)')
                    .eq('reservations.user', req.user.id)

                res.status(200).send(restaurants?.data ?? [])
            } else {
                let restaurants = await db.from('restaurants').select('*')
                res.status(200).send(restaurants?.data ?? [])
            }
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async get(req, res) {
        try {
            let params = req.params
            let restaurant = await db.from('restaurants').select('*').eq('id', params.id)

            if (restaurant.error) {
                throw new Error(restaurant.error)
            } else {
                restaurant = restaurant.data[0]
            }

            if (req.user) {
                await db.from('reservations').select('*')
                    .eq('restaurant', restaurant.id)
                    .eq('user', req.user.id)
                    .then((result) => {
                        if (result.error) throw new Error(result.error)
                        restaurant = { ...restaurant, reservations: result.data }
                    })
            }

            res.status(200).send(restaurant)
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

            if (reservation.error) throw new Error(reservation.error)

            return res.status(201).send(reservation.data)
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async removeReservation(req, res) {
        try {
            let params = req.params
            
            let result = await db.from('reservations').delete()
                .eq('id', parseInt(params.id))
                .eq('restaurant', parseInt(params.rId))
                .eq('user', req.user.id)

            if (result.error) throw new Error()

            return res.status(200).send()
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    }
}

export default restaurantController