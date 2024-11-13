import supabase from "../database/index.js"

const userController = {
    async createGuest(req, res) {
        try {
            const name = `guest_${String(new Date().getTime()).slice(-5)}`

            let user = await supabase.schema('reserveasy').from('users').insert({
                name: name, is_guest: true
            })

            return res.status(201).send(user)
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    },

    async getUsers(req, res) {
        try {
            let users = await supabase.schema('reserveasy').from('users').select('*')
            res.status(200).send(users?.data ?? [])
        } catch (err) {
            console.error(err)
            return res.status(400).send(err)
        }
    }
}

export default userController