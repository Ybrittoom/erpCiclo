const express = require('express')
const router = express.Router()

const userController = require("./user.controller")
const authMiddleware = require("../../../middleware/auth")

router.get("/", authMiddleware, userController.userController.getAll)
router.post("/",  userController.userController.createUser)//testar sem middleware pra ver como funciona

module.exports = router