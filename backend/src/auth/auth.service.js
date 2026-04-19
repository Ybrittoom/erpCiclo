const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { userModel } = require("../modules/users/user.model")
const authConfig = require("../config/auth")

const authService = {
    
    login: async (email, password) => {
        const user = await userModel.findByEmail(email)

        if(!email || !password) {
            throw new Error("Erro, Por favor email e senha obrigatorios")
        }

        if(!user) {
            throw new Error("Erro, usuario nao encontrado")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Senha invalida !!!!!")
        }

        const token = jwt.sign(
            {
                id: user.id,
                position: user.position
            }, 
            authConfig.secret,
            {
                expiresIn: authConfig.expiresIn//mudar para o arquivo .env
            }
        )
        return {
            user,
            token
        }
    }
}

module.exports = authService