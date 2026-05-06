const express = require('express')
const router = express.Router()

const userController = require("./user.controller")
const authMiddleware = require("../../../middleware")

router.get("/users", authMiddleware, userController.userController.getAll)
router.post("/users", authMiddleware, userController.userController.createUser)

module.exports = {
    router
}