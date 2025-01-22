import express, { Request, Response } from "express"
import informacoesController from "../controllers/informacoesController"

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    informacoesController.getAllInformacoes(req, res)
})

router.post('/', (req: Request, res: Response) => {
    informacoesController.postInformacao(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    informacoesController.updateInformacao(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    informacoesController.deleteInformacao(req, res)
})

export default router