import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import db from "../config/database.js"



export async function singUp(req, res) {
    const { name, email, password } = req.body

    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
        const checkEmail = await db.collection("users").findOne({ email })

        if (checkEmail) return res.status(400).send("email já está sendo utilizado")

        await db.collection("users").insertOne({ name, email, password: passwordHashed })

        res.status(201).send("Usuário cadastrado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function singIn (req, res) {
    const {email, password} = req.body
    
    try {
        const checkUser = await db.collection("users").findOne({email})

        if (!checkUser) return res.status(400).send("Usuário ou senha incorretos")

        const isCorrectPassword = bcrypt.compareSync(password, checkUser.password)

        if (!isCorrectPassword) return res.status(400).send("Usuário ou senha incorretos")

        const token = uuidv4()

        await db.collection("sessions").insertOne({idUsuario: checkUser._id, token})

        return res.status(200).send(token)

    } catch (error) {
        res.status(500).send(error.message)
    }
}