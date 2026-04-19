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
    }
}

module.exports = authController