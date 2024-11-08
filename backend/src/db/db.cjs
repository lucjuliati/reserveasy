const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, './database.sql'))

class Database {
    constructor() {
        this.initialize()
    }

    initialize() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS restaurants (
                id INTEGER PRIMARY KEY,
                name TEXT,
                address TEXT,
                picture TEXT
            )`)

            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                email TEXT,
                name TEXT,
                password TEXT
            )`)
        })

        db.close()
    }

    query(str) {
        db.serialize(() => {
            db.run(str)
        })
    }
}

module.exports = new Database()