const { pool, getConnection } = require("../../config/db")

const userModel = {
    findAll: async () => {
        try {
            let querySQL = "SELECT * FROM funcionarios"
            const result = await pool.query(querySQL);
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar os funcionarios: ", error)
            throw error
        }
    },

    findByEmail: async (email) => {
        try {
            const querySQL = 'SELECT * FROM employees WHERE email = $1'
            const result = await pool.query(querySQL, [email])

            console.log("Usuarios encontrado com sucesso")
            return result.rows[0]
        } catch (error) {
            console.error("Erro ao buscar usuario: ", error)
            throw error
        }
    },

    createUser: async (user) => {
       try {
        const querySQL = `
            INSERT INTO employees
            (
                name,
                email,
                password_hash,
                position
            )
            VALUES (
                $1,
                $2,
                $3,
                $4
            )
            RETURNIG *
        `
        const values = [
            user.name,
            user.email,
            user.password_hash,
            user.position
        ]
                                        //passa a query e os valores
        const result = await pool.query(querySQL, values)
        return result.rows[0]
       } catch (error) {
        console.error("Erro ao criar usuarios: ", error)
        throw error
       }
    }
}

module.exports = {
    userModel
}