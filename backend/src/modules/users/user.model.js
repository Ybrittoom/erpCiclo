const { pool , getConnection } = require("../../config/db")

const userModel = {
    findAll: async () => {
        try {
            const pool = await getConnection()

            let querySQL = "SELECT * FROM funcionarios"

            const result = await pool.query(querySQL);

            return result.rows
        } catch (error) {
            console.error("Erro ao buscar os funcionarios: ", error)
            throw error
        }
    },

    findByEmail: async (email) => {
        const pool = await getConnection()

        const result = await pool.request()
            .input("email",  email)
            .query("SELECT * FROM users WHERE email = @email")

        console.log("Usuario encontrado consucesso")
        return result.recordset[0]
    },

    createUser: async (user) => {
        const pool = getConnection();

        const query = `
            INSERT INTO users 
            (name, email, password_hash, position)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `

        const values = [
            user.name,
            user.email,
            user.password_hash,
            user.posrition
        ]

        const result = await pool.query(query, values)

        return result.rows[0]
    }
}

module.exports = {
    userModel
}