import express from 'express'

import { errorHandler, serverMiddlewares } from './endpoint/middlewares.js'
import { controller as mainController } from './endpoint/controller.js'
import { PORT } from './config.js'

const app = express()

app.use(serverMiddlewares)

app.get('/flights/:id/passengers', mainController)

app.use(errorHandler)

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})
