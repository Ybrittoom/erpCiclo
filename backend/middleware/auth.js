const jwt = require('jsonwebtoken')
const authConfig = require('../src/config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    //verifica se tem token
    if (!authHeader) {
        return res.status(401).json({ error: "Token nao fornecido!" })
    }

    //formato: bearer token
    const parts =  authHeader.split('')

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token"})
    }

    const [scheme , token ] = parts

    if (!/^Bearer$/i.tes(scheme)) {
        return res.status(401).json({error: "Token invalido!"})
    }

    //validar o token
    jwt.verify(token, authConfig.scret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error : "Token invalido ou expirado "})
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        return next
    })
}