import express from 'express'

import { Airplane } from './models/Airplane.js'
import { checkFlight, errorHandler, serverMiddlewares } from './middlewares.js'
import { PORT } from './config.js'

const app = express()

app.use(serverMiddlewares)

app.get('/flights/:id/passengers', checkFlight, function (req, res) {
    const { boardingPass, ...flight } = req.flight
    const airplane = new Airplane(flight.flightId, boardingPass)

    res.status(200).send({
        data: {
            ...flight,
            passengers: airplane.getAllPassengers(),
        },
    })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})
