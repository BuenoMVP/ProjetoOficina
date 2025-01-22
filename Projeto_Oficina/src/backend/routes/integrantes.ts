import express, { Request, Response } from "express"
import integrantesController from "../controllers/integrantesController"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    integrantesController.getAllIntegrantes(req, res)
})

router.post('/', (req: Request, res: Response) => {
    integrantesController.postIntegrante(req, res)
})

export default router