const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 3000

const app = express()

//middleware globais do projetos completo
app.use(cors())
app.use(express.json())//usando para mostrar os erros atravez dos JSON

//importando as rotas

const userRoutes = require("./src/modules/users/user.routes")

//usando as rotas
app.get('/user', userRoutes.router)
app.post('/user', userRoutes.router)//é um objeto e nao uma funçaos

//rota de teste
app.get('/teste', (req, res) => {
    res.send('API esta rodando')
})


//iniciando o servidor 
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT/*sempre definir as variaveis do .env antes de usar a mesma */}`)
})