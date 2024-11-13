

const session = {
    setData(data) {
        localStorage.setItem('me', data)
    },

    isAuth() {
        let info = this.getData()
        return ('token' in info)
    },

    getData() {
        try {
            const me = localStorage.getItem('me')
            if (!me) throw new Error()

            return me
        } catch (err) {
            console.error(err)
        }
    },

    getToken: () => this.getData().token,
}

export default session