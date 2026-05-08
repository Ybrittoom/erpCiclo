const { userModel } = require("./user.model")

const userService = {
    getAllUsers: async (currentUser/*Usuario que esta acessando o site ex: o dono  */) => {

        //regra, so o dono pode acessar os usuario  s
        if (currentUser.position !== "CEO") {
            throw new Error("Acesso negado")
        }

        return await userModel.findAll()//entrega todos os usuarios
    },

    createUser: async (data, currentUser) => {
        // if (currentUser.position !== "CEO") {
        //     throw new Error("Acesso negado!")
        // }

        return await userModel.createUser(data)//dados do novo funcionario
    }


}

module.exports = {
    userService
}