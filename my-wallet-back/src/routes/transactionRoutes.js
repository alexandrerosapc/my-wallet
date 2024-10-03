import { Router } from "express";
import { authValidation } from "../middleware/authMiddleware.js";
import { listTransactions, newInput, newOutput } from "../controller/transactions.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { transactionSchema } from "../models/transactionSchema.js";

const transactionRouter = Router()

transactionRouter.use(authValidation)
transactionRouter.get("/home", listTransactions)
transactionRouter.post("/nova-entrada", validateSchema(transactionSchema), newInput)
transactionRouter.post("/nova-saida", validateSchema(transactionSchema), newOutput)

export default transactionRouter