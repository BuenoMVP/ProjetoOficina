import express, { Request, Response } from 'express'
import router from '../routes/router'
import bodyParser from 'body-parser'
import cors from 'cors'
import usuariosController from '../controllers/usuariosController'

const server = express()

server.use(bodyParser.json())

server.use(cors())

server.get('/', (_req: Request, res: Response) => {
    res.send('Login API')
})

server.post('/', (req: Request, res: Response) => {
    usuariosController.login(req, res)
})

server.use('/api', router)

export { server }