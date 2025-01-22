import express, { Request, Response } from "express"
import integrantesRouter from "./integrantes"
import usuariosRouter from "./usuarios"
import informacoesRouter from "./informacoes"
import encontrosRouter from "./encontros"
import gruposRouter from "./grupos"
import statusRouter from "./status"

const router = express.Router()

router.use('/integrantes', integrantesRouter)
router.use('/usuarios', usuariosRouter)
router.use('/informacoes', informacoesRouter)
router.use('/encontros', encontrosRouter)
router.use('/grupos', gruposRouter)
router.use('/status', statusRouter)

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router