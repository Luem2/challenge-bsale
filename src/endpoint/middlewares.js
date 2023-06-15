import cors from 'cors'
import morgan from 'morgan'
import { json as expressJSON, urlencoded } from 'express'

export const serverMiddlewares = [
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Origin',
            'X-Requested-With',
            'Accept',
        ],
    }),
    morgan('dev'),
    expressJSON({
        limit: '50mb',
    }),
    urlencoded({
        extended: true,
        limit: '50mb',
    }),
]

/* eslint-disable no-unused-vars */
export function errorHandler(err, _req, res, _next) {
    const { message, status } = err

    if (status === 404) {
        console.error(message)

        res.status(status).send({
            data: {},
        })
    } else {
        console.error(message)

        res.status(400).json({
            errors: 'could not connect to db',
        })
    }
}
