import express from 'express'

import { serverMiddlewares } from './middlewares.js'
import { PORT } from './config.js'
import { prisma } from './config.js'

const app = express()

app.use(serverMiddlewares)

app.get('/', async (_req, res) => {
    const airplaines = await prisma.airplane.findMany()

    res.send({
        msg: airplaines,
    })
})

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})
