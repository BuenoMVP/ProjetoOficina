import express, { Request, Response } from "express";
import gruposController from "../controllers/gruposController";

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    gruposController.getAllGrupos(req, res)
})

router.post('/', (req: Request, res: Response) => {
    gruposController.postGrupo(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    gruposController.updateGrupo(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    gruposController.deleteGrupo(req, res)
})

export default router