import express, { Request, Response } from "express";
import statusController from "../controllers/statusController";
import { verifyToken, verifyTokenAdmin } from "../middlewares/authService";

const router = express.Router()

router.get('/', verifyToken, (req: Request, res: Response) => {
    statusController.getAllStatus(req, res)
})

router.post('/', verifyTokenAdmin, (req: Request, res: Response) => {
    statusController.postStatus(req, res)
})

router.put('/:id', verifyTokenAdmin, (req: Request, res: Response) => {
    statusController.updateStatus(req, res)
})

router.delete('/:id', verifyTokenAdmin, (req: Request, res: Response) => {
    statusController.deleteStatus(req, res)
})

export default router