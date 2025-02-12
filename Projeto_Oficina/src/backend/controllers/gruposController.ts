import { Request, Response } from "express";
import schemaGrupos from "../models/Grupos";
import { gruposProps } from "../types/bdTypes";

const gruposController = {
    postGrupo: async (req: Request, res: Response) => {
        try {
            const grupo: gruposProps = { ...req.body };

            const objGrupo = await schemaGrupos.create(grupo);

            if (!objGrupo)
                return res.status(400).json({ msg: "Grupo não criado!" });

            res.status(201).json({ objGrupo, msg: "Grupo criado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao adicionar grupo": error });
        }
    },

    getAllGrupos: async (_req: Request, res: Response) => {
        try {
            const objGrupos = await schemaGrupos.find().populate("integrantes").populate("status");

            if (!objGrupos)
                return res.status(404).json({ msg: "Grupos não encontrados!" });

            res.status(200).send(objGrupos);
        } catch (error) {
            res.status(400).json({ "Erro ao resgatar grupos": error });
        }
    },

    updateGrupo: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const grupo: gruposProps = { ...req.body };

            const objGrupo = await schemaGrupos.findByIdAndUpdate(id, grupo);

            if (!objGrupo)
                return res.status(404).json({ msg: "Grupo não encontrado!" });

            res.status(200).json({ objGrupo, msg: "Grupo atualizado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao atualizar grupo": error });
        }
    },

    deleteGrupo: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const objGrupo = await schemaGrupos.findByIdAndDelete(id);

            if (!objGrupo)
                return res.status(404).json({ msg: "Grupo não encontrado!" });

            res.status(200).json({ objGrupo, msg: "Grupo deletado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao deletar grupo": error });
        }
    }
}

export default gruposController