import { Request, Response } from "express";
import schemaUsuarios from "../models/Usuarios";
import { usuariosProps } from "../types/bdTypes";
import { createToken } from "../middlewares/authService";

const usuariosController = {
  postUsuario: async (req: Request, res: Response) => {
    try {
      const usuario: usuariosProps = { ...req.body };

      const objUsuario = await schemaUsuarios.create(usuario);

      if (!objUsuario)
        return res.status(400).json({ msg: "Usuário não criado!" });

      res.status(201).json({ objUsuario, msg: "Usuário criado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao adicionar usuário": error });
    }
  },

  getAllUsuarios: async (_req: Request, res: Response) => {
    try {
      const objUsuarios = await schemaUsuarios.find();

      if (!objUsuarios)
        return res.status(404).json({ msg: "Usuários não encontrados!" });

      res.status(200).send(objUsuarios);
    } catch (error) {
      res.status(400).json({ "Erro ao resgatar usuários": error });
    }
  },

  updateUsuario: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usuario: usuariosProps = { ...req.body };

      const objUsuario = await schemaUsuarios.findByIdAndUpdate(id, usuario);

      if (!objUsuario)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      res.status(200).json({ objUsuario, msg: "Usuário atualizado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao atualizar usuário": error });
    }
  },

  deleteUsuario: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const objUsuario = await schemaUsuarios.findByIdAndDelete(id);

      if (!objUsuario)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      res.status(200).json({ objUsuario, msg: "Usuário deletado!" });
    } catch (error) {
      res.status(400).json({ "Erro ao deletar usuário": error });
    }
  },

  //Login

  login: async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      const validUser = await schemaUsuarios.find({ 
        email: email, 
        senha: senha 
      });

      if (validUser.length <= 0)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      const authToken = createToken(validUser[0]);

      res.status(200).send(authToken);
    } catch (error) {
      res.status(400).json({ "Erro ao logar": error });
    }
  }
};

export default usuariosController;
