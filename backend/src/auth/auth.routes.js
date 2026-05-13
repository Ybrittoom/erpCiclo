const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')

router.post('/login', authController.login)

module.exports = router
/*
    ou importa assim 

    module.exports = {
        router
    }
*/