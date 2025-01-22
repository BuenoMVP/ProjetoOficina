import express, { Request, Response } from "express"
import integrantesRouter from "./integrantes"

const router = express.Router()

router.use('/integrantes', integrantesRouter)

router.use('/', (_req: Request, res: Response) => {
    res.send('Página inicial da api')
})

export default router