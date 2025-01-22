import { Request, Response } from "express";
import schemaInformacoes from "../models/Informacoes";
import { informacoesProps } from "../types/bdTypes";

const informacoesController = {
    postInformacao: async (req: Request, res: Response) => {
        try {
            const informacao: informacoesProps = { ...req.body };

            const objInformacao = await schemaInformacoes.create(informacao);

            if (!objInformacao)
                return res.status(400).json({ msg: "Informação não criada!" });

            res.status(201).json({ objInformacao, msg: "Informação criada!" });
        } catch (error) {
            res.status(400).json({ "Erro ao adicionar informação": error });
        }
    },

    getAllInformacoes: async (_req: Request, res: Response) => {
        try {
            const objInformacoes = await schemaInformacoes.find();

            if (!objInformacoes)
                return res.status(404).json({ msg: "Informações não encontradas!" });

            res.status(200).send(objInformacoes);
        } catch (error) {
            res.status(400).json({ "Erro ao resgatar informações": error });
        }
    },

    updateInformacao: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const informacao: informacoesProps = { ...req.body };

            const objInformacao = await schemaInformacoes.findByIdAndUpdate(id, informacao);

            if (!objInformacao)
                return res.status(404).json({ msg: "Informação não encontrada!" });

            res.status(200).json({ objInformacao, msg: "Informação atualizada!" });
        } catch (error) {
            res.status(400).json({ "Erro ao atualizar informação": error });
        }
    },

    deleteInformacao: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const objInformacao = await schemaInformacoes.findByIdAndDelete(id);

            if (!objInformacao)
                return res.status(404).json({ msg: "Informação não encontrada!" });

            res.status(200).json({ objInformacao, msg: "Informação deletada!" });
        } catch (error) {
            res.status(400).json({ "Erro ao deletar informação": error });
        }
    }
}

export default informacoesController