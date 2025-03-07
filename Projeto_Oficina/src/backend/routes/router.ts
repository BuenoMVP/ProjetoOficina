import express, { Request, Response } from "express"
import integrantesRouter from "./integrantes"
import usuariosRouter from "./usuarios"
import informacoesRouter from "./informacoes"
import encontrosRouter from "./encontros"
import gruposRouter from "./grupos"
import statusRouter from "./status"
import emailRouter from "./email"
import { verifyToken } from "../middlewares/authService"

const router = express.Router()

router.use('/integrantes', verifyToken, integrantesRouter)
router.use('/usuarios', usuariosRouter)
router.use('/informacoes', verifyToken, informacoesRouter)
router.use('/encontros', verifyToken, encontrosRouter)
router.use('/grupos', verifyToken, gruposRouter)
router.use('/status', statusRouter)
router.use('/email', emailRouter)

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router