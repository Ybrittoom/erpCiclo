const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 3000

const app = express()

//middleware globais do projetos completo
app.use(cors())
app.use(express.json())//converter JSON recebido no body da requisição.

//importando as rotas
const authRoutes = require("./src/auth/auth.routes")
const userRoutes = require("./src/modules/users/user.routes")

console.log(authRoutes)
console.log(userRoutes)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Rota de teste
app.get('/teste', (req, res) => {
    res.json({ message: 'API está rodando' })
})

//iniciando o servidor 
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT/*sempre definir as variaveis do .env antes de usar a mesma */}`)
})