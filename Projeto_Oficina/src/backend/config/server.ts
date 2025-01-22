import express from 'express'
import router from '../routes/router'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

server.use(bodyParser.json())

server.use(cors())

server.get('/', (_req, res) => {
    res.send('Inicio Back')
})

server.use('/api', router)

export { server }