import express, { Request, Response } from 'express'
import router from '../routes/router'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

server.use(bodyParser.json())

server.use(cors())

server.get('/', (_req: Request, res: Response) => {
    res.send('Inicio Back')
})

server.use('/api', router)

export { server }