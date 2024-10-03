import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/authRouts.js"
import transactionRouter from "./routes/transactionRoutes.js"

dotenv.config()

const server = express()

server.use(express.json())

server.use(cors())

server.use([authRouter, transactionRouter])

server.listen(process.env.PORT, () => {
    console.log('Servidor funcionou')
})