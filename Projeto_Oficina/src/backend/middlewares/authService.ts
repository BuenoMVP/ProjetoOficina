import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.JWT_SECRET || 'default_secret'

const createToken = (user: object) => {
    const token = jwt.sign({data: user}, secret)
    // console.log("token: "+token)
    return token
}

const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token){
        res.status(401).send({Error: 'Token não encontrado!'})
        return 
    }

    try {
        const decoded: string | JwtPayload = jwt.verify(token, secret)
        
        req.body.auth = decoded
        next()
    } catch (error) {
        res.status(401).send({'Token inválido': error})
        return 
    }
}

const verifyTokenAdmin = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        res.status(401).send({Error: 'Token não encontrado!'})
        return 
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload
        const cred = JSON.parse(JSON.stringify(decoded))
        const isAdmin = cred.data.admin

        if (!isAdmin) {
            res.status(401).send('Acesso negado!');
            return 
        }

        req.body.auth = decoded;
        next();
    } catch (error) {
        res.status(401).send({'Token inválido': error})
        return 
    }
}

export { createToken, verifyToken, verifyTokenAdmin }