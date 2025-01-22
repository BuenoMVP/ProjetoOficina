import express, { Request, Response } from "express";
import statusController from "../controllers/statusController";

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    statusController.getAllStatus(req, res)
})

router.post('/', (req: Request, res: Response) => {
    statusController.postStatus(req, res)
})

router.put('/:id', (req: Request, res: Response) => {
    statusController.updateStatus(req, res)
})

router.delete('/:id', (req: Request, res: Response) => {
    statusController.deleteStatus(req, res)
})

export default router