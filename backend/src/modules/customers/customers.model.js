const { pool } = require("../../config/db")

const customersModel = {
    findAll: async () => {
        try {
            let querySQL = "SELECT * FROM customers"
            const result = await pool.query(querySQL)
            return result.rows
        } catch (error) {
            console.error("Erro ao buscar os funcionarios: ", error)
            throw error
        }
    },

    findByEmail: async (email) => {
        try {
            let querySQL = `
                SELECT * FROM customers 
                WHERE email_costumers = $1
            `
            const result = await pool.query(querySQL, [email])

            console.log('Cliente encontrado com sucesso!!')
            return result.row[0]
        } catch (error) {
            console.error("Erro ao buscar cliente por email: ", error)
            throw error
        }
    },

    //CONTINUAÇAO AQUI.........
    //funtion addCustomers
}
