const { userService } = require("./user.service")

const userController = {

    getAll: async (req, res) => {
        try {
            console.log("Req: " , req)
            
            const users = await userService.getAllUsers(req.user)
            console.log("Users: ", users)
            res.json(users)
        } catch (error) {
            res.status(403).json({ error: error.message})
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await userService.createUser(req.body, req.user)
            res.status(201).json(user)
        } catch (error) {
            res.status(403).json({ error: error.message})
        }
    }
}

module.exports = {
    userController
}