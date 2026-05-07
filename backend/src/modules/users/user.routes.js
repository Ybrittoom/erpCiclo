const express = require('express')
const router = express.Router()

const userController = require("./user.controller")
const authMiddleware = require("../../../middleware/auth")

router.get("/users", authMiddleware, userController.userController.getAll)
router.post("/users",  userController.userController.createUser)//testar sem middleware pra ver como funciona

module.exports = {
    router
}