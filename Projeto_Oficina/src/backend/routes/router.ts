import express from "express"

const router = express.Router()

router.use('/', (_req, res) => {
    res.send('Página inicial da api')
})

export default router