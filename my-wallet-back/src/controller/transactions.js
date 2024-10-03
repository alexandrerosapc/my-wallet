import db from "../config/database.js";

export async function listTransactions(req, res) {

    try {
        const dados = await db.collection("transactions").find().toArray()

        console.log(dados)

        return res.send(dados)
    } catch (error) {
        res.status(500).send("Algo deu errado no servidor de banco de dados")
    }

}

export async function newInput(req, res) {

    const { valor, descricao, data } = req.body

    const checkSession = res.locals.sessao

    try {
        const input = await db.collection("transactions").insertOne({ valor, descricao, data, tipo: "entrada", idUsuario: checkSession.idUsuario })

        console.log(input)

        res.send("Ok")
    } catch (error) {
        res.status(500).send("Algo deu errado no servidor")
    }

}

export async function newOutput(req, res) {

    const { valor, descricao, data } = req.body

    const checkSession = res.locals.sessao

    try {
        const output = await db.collection("transactions").insertOne({ valor, descricao, data, tipo: "saida", idUsuario: checkSession.idUsuario })

        console.log(output)

        res.send("Ok")
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Algo deu errado no servidor")
    }

}
