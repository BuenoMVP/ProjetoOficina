import { Request, Response } from "express";
import schemaEncontros from "../models/Encontros";
import { encontrosProps } from "../types/bdTypes";

const encontrosController = {
    postEncontro: async (req: Request, res: Response) => {
        try {
            const encontro: encontrosProps = { ...req.body };

            const objEncontro = await schemaEncontros.create(encontro);

            if (!objEncontro)
                return res.status(400).json({ msg: "Encontro não criado!" });

            res.status(201).json({ objEncontro, msg: "Encontro criado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao adicionar encontro": error });
        }
    },

    getAllEncontros: async (_req: Request, res: Response) => {
        try {
            const objEncontros = await schemaEncontros.find().populate("usuarios");

            if (!objEncontros)
                return res.status(404).json({ msg: "Encontros não encontrados!" });

            res.status(200).send(objEncontros);
        } catch (error) {
            res.status(400).json({ "Erro ao resgatar encontros": error });
        }
    },

    getEncontrosByGrupo: async (req: Request, res: Response) => {
        try {
            const { grupo } = req.params;

            const objEncontros = await schemaEncontros.find({ grupoID: grupo });

            if (!objEncontros)
                return res.status(404).json({ msg: "Encontros não encontrados para este grupo!" });

            res.status(200).send(objEncontros);
        } catch (error) {
            res.status(400).json({ "Erro ao resgatar encontros por grupo": error });
        }
    },

    updateEncontro: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const encontro: encontrosProps = { ...req.body };

            const objEncontro = await schemaEncontros.findByIdAndUpdate(id, encontro);

            if (!objEncontro)
                return res.status(404).json({ msg: "Encontro não encontrado!" });

            res.status(200).json({ objEncontro, msg: "Encontro atualizado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao atualizar encontro": error });
        }
    },

    deleteEncontro: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const objEncontro = await schemaEncontros.findByIdAndDelete(id);

            if (!objEncontro)
                return res.status(404).json({ msg: "Encontro não encontrado!" });

            res.status(200).json({ objEncontro, msg: "Encontro deletado!" });
        } catch (error) {
            res.status(400).json({ "Erro ao deletar encontro": error });
        }
    }
}

export default encontrosController