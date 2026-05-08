const { pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
})

async function getConnection() {
    try {
        const pool = await pool.conect()
        return pool
    } catch (error) {
        console.error("Erro ao conectar no PostgresSQL: ", error)
    }
}

module.exports = {
    pool,
    getConnection
}