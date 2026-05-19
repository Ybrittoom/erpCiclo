const authService = require("./auth.service")
const auhtService = require("./auth.service")

const authController = {
    
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const result = await auhtService.login(email, password)

            res.json(result)
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    },

    register: async (req, res) => {
        try {
            const {
                name,
                email,
                password
            } = req.body

            const result = await authService.register(name, email, password)

            res.status(201).json(result)
        } catch (error) {
            res.status(400).json({
                error: "Erro ao registrar novo usuario no servidor: ", error
            })
        }
    }
}

module.exports = authController