import { Request, Response } from "express";
import schemaIntegrantes from "../models/Integrantes";
import { integrantesProps } from "../types/bdTypes";
import schemaGrupos from "../models/Grupos";

const integrantesController = {
  postIntegrante: async (req: Request, res: Response) => {
    try {
      const integrante: integrantesProps = { ...req.body };

      const objGrupo = await schemaGrupos.findById(integrante.grupoID);

      if (!objGrupo) 
        return res.status(404).json({ msg: "Grupo não encontrado para cadastro de integrante!" })

      const objIntegrante = await schemaIntegrantes.create(integrante);

      if (!objIntegrante) 
        return res.status(400).json({ msg: "Integrante não criado!" })
      
      objGrupo.integrantes.push(objIntegrante);

      await schemaGrupos.findByIdAndUpdate(integrante.grupoID, objGrupo);

      res.status(201).json({ objIntegrante, msg: "Integrante criado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar integrante": error });
    }
  },

  getAllIntegrantes: async (_req: Request, res: Response) => {
    try {
      const objIntegrantes = await schemaIntegrantes.find();

      if (!objIntegrantes) 
        return res.status(404).json({ msg: "Integrantes não encontrados!" })

      res.status(200).send(objIntegrantes);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar integrantes": error });
    }
  },

  getIntegrantesByGrupo: async (req: Request, res: Response) => {
    try {
      const { grupo } = req.params;

      const objIntegrantes = await schemaIntegrantes.find({ grupoID: grupo });

      if (!objIntegrantes) 
        return res.status(404).json({ msg: "Integrantes não encontrados para este grupo!" })

      res.status(200).send(objIntegrantes);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar integrantes por grupo": error });
    }
  },

  updateIntegrante: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const integrante: integrantesProps = { ...req.body };

      const objIntegrante = await schemaIntegrantes.findByIdAndUpdate(id, integrante)

      if (!objIntegrante) 
        return res.status(404).json({ msg: "Integrante não encontrado!" })

      res.status(200).json({ objIntegrante, msg: "Integrante atualizado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao atualizar integrante": error });
    }
  },

  deleteIntegrante: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const objIntegrante = await schemaIntegrantes.findByIdAndDelete(id);

      if (!objIntegrante) 
        return res.status(404).json({ msg: "Integrante não encontrado!" })

      const objGrupo = await schemaGrupos.findById(objIntegrante.grupoID);

      if (!objGrupo) 
        return res.status(404).json({ msg: "Grupo não encontrado para deletar integrante!" })

      const index = objGrupo.integrantes.indexOf(objIntegrante);

      const updateGrupo = objGrupo.integrantes.slice(index, 1);

      await schemaGrupos.findByIdAndUpdate(objGrupo, updateGrupo);

      res.status(200).json({ objIntegrante, msg: "Integrante deletado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao deletar integrante": error })
    }
  }

};

export default integrantesController;
