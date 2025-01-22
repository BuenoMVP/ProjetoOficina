import express, { Request, Response } from "express";
import encontrosController from "../controllers/encontrosController";

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    encontrosController.getAllEncontros(req, res)
})

router.post('/', (req: Request, res: Response) => {
    encontrosController.postEncontro(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    encontrosController.updateEncontro(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    encontrosController.deleteEncontro(req, res)
})

export default router