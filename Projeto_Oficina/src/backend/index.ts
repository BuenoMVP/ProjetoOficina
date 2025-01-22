import { server } from "./config/server"

import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 3001

server.listen(port, () => {
    console.log('Server runnig on port: '+port)
})