const express = require('express')
const router = express.Router()

const userController = require("./user.controller")
const authMiddleware = require("../../../middleware/auth")

router.get("/user", authMiddleware, userController.userController.getAll)
router.post("/user",  userController.userController.createUser)//testar sem middleware pra ver como funciona

module.exports = router