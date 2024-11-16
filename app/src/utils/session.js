

const session = {
    setData(data) {
        try {
            localStorage.setItem('me', JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    },

    isAuth() {
        try {
            let info = this.getData()

            if (info == null) return false

            return ('token' in info)
        } catch (err) {
            console.error(err)
            return false
        }
    },

    getData() {
        try {
            const storage = localStorage.getItem('me')

            if (storage == null) return null

            const me = JSON.parse(storage)

            if (!me) throw new Error()

            return me
        } catch (err) {
            console.error(err)
            return null
        }
    },

    getToken() {
        return this.getData()?.token
    },
}

export default session