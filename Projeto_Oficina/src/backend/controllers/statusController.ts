import { Request, Response } from "express";
import schemaStatus from "../models/Status";
import { statusProps } from "../types/bdTypes";

const statusController = {
    postStatus: async (req: Request, res: Response) => {
        try {
            const status: statusProps = { ...req.body };

            const objStatus = await schemaStatus.create(status);

            if (!objStatus)
                return res.status(400).json({ msg: "Status não criado!" });

            res.status(201).json({ objStatus, msg: "Status criado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao adicionar status": error });
        }
    },

    getAllStatus: async (_req: Request, res: Response) => {
        try {
            const objStatus = await schemaStatus.find();

            if (!objStatus)
                return res.status(404).json({ msg: "Status não encontrado!" });

            res.status(200).send(objStatus);
        } catch (error) {
            res.status(400).json({ "Erro ao resgatar status": error });
        }
    },

    updateStatus: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const status: statusProps = { ...req.body };

            const objStatus = await schemaStatus.findByIdAndUpdate(id, status);

            if (!objStatus)
                return res.status(404).json({ msg: "Status não encontrado!" });

            res.status(200).json({ objStatus, msg: "Status atualizado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao atualizar status": error });
        }
    },

    deleteStatus: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const objStatus = await schemaStatus.findByIdAndDelete(id);

            if (!objStatus)
                return res.status(404).json({ msg: "Status não encontrado!" });

            res.status(200).json({ objStatus, msg: "Status deletado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao deletar status": error });
        }
    }
}

export default statusController