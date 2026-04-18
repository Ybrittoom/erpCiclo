const { pool , getConnection } = require("../../config/db")

const userModel = {
    findAll: async () => {
        try {
            const pool = await getConnection()

            let querySQL = "SELECT * FROM funcionarios"

            const result = await pool.request().query(querySQL);

            return result.recordset
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

        const result = await pool.request()
            .input("name", user.name)
            .input("email", user.email)
            .input("password_hash", user.password_hash)
            .input("position", user.position)
            .query(`
                    INSERT INTO users (name, email, password_hash, position)
                    VALUES (@name, @email, @password_hash, @position)
                `)

            console.log("Usuario criado com sucesso")
            return result
    }
}

module.exports = {
    userModel
}