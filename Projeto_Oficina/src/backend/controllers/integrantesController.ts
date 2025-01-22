import { Request, Response } from "express";
import schemaIntegrantes from "../models/Integrantes";
import { integrantesProps } from "../types/bdTypes";

const integrantesController = {
  postIntegrante: async (req: Request, res: Response) => {
    try {
      const integrante: integrantesProps = { ...req.body };

      const objIntegrante = await schemaIntegrantes.create(integrante);

      res.status(201).json({ objIntegrante, msg: "Integrante criado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar integrante": error });
    }
  },

  getAllIntegrantes: async (_req: Request, res: Response) => {
    try {
      const objIntegrantes = await schemaIntegrantes.find();

      res.status(200).send(objIntegrantes);
    } catch (error) {
      res.status(400).json(error);
    }
  }

};

export default integrantesController;
