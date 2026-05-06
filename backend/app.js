const express = require("express")
const cors = require("cors")

const app = express()

//middleware globais do projetos completo
app.use(cors())
app.use(express.json())//usando para mostrar os erros atravez dos JSON

//importando as rotas

const userRoutes = require("./src/modules/users/user.routes")

//usando as rotas
app.use('/user', userRoutes)

//rota de teste
app.get('/teste', (req, res) => {
    res.send('API esta rodando')
})


//iniciando o servidor 
app.listen(process.env.PORT || 8081, () => {
    console.log(`servidor rodando na porta ${PORT || 8081}`)
})