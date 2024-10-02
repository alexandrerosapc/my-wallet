import { Router } from "express";
import { loginSchema, usuarioSchema } from "../models/authSchema.js";
import { singIn, singUp } from "../controller/auth.js";
import { validateSchema } from "../middleware/validateSchema.js";

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(usuarioSchema), singUp)
authRouter.post("/sign-in", validateSchema(loginSchema), singIn)

export default authRouter