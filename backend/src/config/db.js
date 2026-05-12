const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({               
    host: process.env.DB_HOST,
    user: process.env.DB_USER,        
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
})

pool.on('connect', () => {
    console.log("Conectado ao PostgreSql com sucesso!")
})

pool.on('error', (err) => {
    console.log("Erro na conexao com o PostgreSql: ", err)
})

module.exports = {
    pool
}