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
            sucess: true,
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                position: user.position
            }
        }
    },

    register: async (name, email, password) => {
        try {
            //verificar se nao estao null os dados
            if(!name || !email || !password) {
                console.log("Por Favo, Preencha todos os campos!")
                throw new Error("Forneça os dados , preencha todos os dados!!")
            }
            //verificar se o email nao existe
            const existing = await pool.query(`
                SELECT * FROM employees 
                WHERE id = $1
            `,
            [ email]
            )
            if(email.rows.lenght > 0) {
                console.log("email ja cadastrado")
                throw new Error("Email ja cadastrado!")
            }
            //inserir um novo usuarios 
            const result = await pool.query(`
                INSERT INTO employee (
                    name,
                    email,
                    password,
                    position
                    )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4
                ) RETURNING *
            `,
            [
                name,
                email,
                password,
                position,
                'employee'
            ]
            )
            const newUser = result.rows[0]
            
            //gerar o novo tokenn
            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                    password: newUser.password,
                    position: newUser.position
                },
                process.env.JWT_SECRET || 'Chaveeee',
                {
                    expiresIn: '24h'
                }
            )

            return {
                sucess: true,
                message: 'Usuario registrado com sucesso',
                token: token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    password: newUser.password,
                    position: newUser.position
                }
            }

        } catch (error) {
            
        }
    }
}

module.exports = authService