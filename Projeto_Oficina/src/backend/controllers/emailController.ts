import { Request, Response } from 'express';
import schemaUsuarios from '../models/Usuarios';
import { hash } from 'bcryptjs';
import sendEmail from '../config/email.config';

const geraCodigo = (): string => {
    const min = 0;
    const max = 9999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString().padStart(4, '0');
}

const emailController = {
    recuperarSenha: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const validEmail = await schemaUsuarios.find({
                email: email
            })
        
            if (validEmail.length <= 0)
                return res.status(400).json({ msg: "Email não encontrado!" });

            const tokenRecuperacao = geraCodigo();

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await schemaUsuarios.findByIdAndUpdate(validEmail[0]._id, {
                '$set': {
                    senhaResetToken: tokenRecuperacao,
                    senhaResetExpires: now
                }
            })

            const mailContent = {
                subject: "Recuperação de senha",
                text: `Seu código de recuperação é: ${tokenRecuperacao}`,
                html: `<h1>Recuperação de Senha</h1>
                <p>Seu código de recuperação é: <strong>${tokenRecuperacao}</strong></p>
                `
              }

            await sendEmail(email, mailContent)

            res.status(200).json({ msg: "Email enviado com sucesso!" });

        } catch (error) {
            res.status(400).json({ "Erro ao recuperar senha": error });
        }
    },

    alterarSenha: async (req: Request, res: Response) => {
        try {
            const { email, token, novaSenha } = req.body

            const validEmail = await schemaUsuarios.find({
                email: email
            }).select('+senhaResetToken senhaResetExpires')
        
            if (validEmail.length <= 0)
                return res.status(400).json({ msg: "Email não encontrado!" });

            const user = validEmail[0];

            if (token !== user.senhaResetToken)
                return res.status(400).json({ msg: "Token inválido!" });

            const now = new Date();

            if (now > user.senhaResetExpires)
                return res.status(400).json({ "Token expirado": "Solicite um novo token!"});

            user.senha = await hash(novaSenha, 8);

            const objUser = await user.save();

            res.status(200).send(objUser);

        } catch (error) {
            res.status(400).json({ "Erro ao alterar nova senha": error })
        }
    }
}

export default emailController;