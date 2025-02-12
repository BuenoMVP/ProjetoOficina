import { Request, Response } from "express";
import schemaUsuarios from "../models/Usuarios";
import { usuariosProps } from "../types/bdTypes";
import { createToken } from "../middlewares/authService";
import { hash, compare } from "bcryptjs";
import sendEmail from "../config/email.config";

const usuariosController = {
  postUsuario: async (req: Request, res: Response) => {
    try {
      const usuario: usuariosProps = { ...req.body };

      const validUser = await schemaUsuarios.find({
        email: usuario.email
      })

      if (validUser.length > 0)
        return res.status(400).json({ msg: "Usuário já cadastrado!" });

      const passwordRandom = generateRandomPassword()

      const passwordHash = await hash(passwordRandom, 8);

      const novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: passwordHash,
        admin: usuario.admin
      }

      const objUsuario = await schemaUsuarios.create(novoUsuario);

      if (!objUsuario)
        return res.status(400).json({ msg: "Usuário não criado!" });

      const mailContent = {
        subject: "Cadastro de usuário",
        text: `Email: ${novoUsuario.email} -- Senha: ${passwordRandom}`,
        html: `<h1>Dados cadastrais</h1>
        <p>Seu email é: <strong>${novoUsuario.email}</strong></p>
        <p>Sua senha é: <strong>${passwordRandom}</strong></p>
        <span>ALTERE SUA SENHA CLICANDO EM "Esqueci minha senha" NA TELA DE LOGIN!</span>
        `
      }

      await sendEmail(novoUsuario.email, mailContent)

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

      const passwordHash = await hash(usuario.senha, 8);

      const novoUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        senha: passwordHash,
        admin: usuario.admin
      }

      const objUsuario = await schemaUsuarios.findByIdAndUpdate(id, novoUsuario);

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

      const validUser = await schemaUsuarios.find({ email: email });

      if (validUser.length <= 0)
        return res.status(404).json({ msg: "Usuário não encontrado!" });

      const admin = validUser[0].admin;

      const comparePassword = await compare(senha, validUser[0].senha);

      if (!comparePassword)
        return res.status(401).json({ msg: "Senha inválida!" });

      const authToken = createToken(validUser[0]);

      res.status(200).json({ token: authToken, admin: admin});
    } catch (error) {
      res.status(400).json({ "Erro ao logar": error });
    }
  }
};

const generateRandomPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
  }
  return password;
}

export default usuariosController;
