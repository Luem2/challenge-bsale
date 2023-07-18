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
        code: res.statusCode,
        data: {
            ...flight,
            passengers: airplane.getAllPassengers(),
        },
    })
})

app.all('*', function (req, res) {
    const { hostname, protocol } = req

    res.status(404).send({
        code: res.statusCode,
        message: 'Not found',
        example_endpoint: `${protocol}://${hostname}:${PORT}/flights/1/passengers`,
    })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`)
})
