import cors from 'cors'
import morgan from 'morgan'
import { json as expressJSON, urlencoded } from 'express'
import { prisma } from './config.js'
import { CustomError } from './utils/customError.js'
import { normalizeData } from './utils/normalizeProp.js'

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

export async function checkFlight(req, _res, next) {
    try {
        const id = Number(req.params.id)

        if (typeof id !== 'number')
            throw new CustomError(
                'The id is required, and must be a number',
                400
            )

        const flight = await prisma.flight.findUnique({
            where: {
                flight_id: id,
            },
            include: {
                boarding_pass: {
                    include: {
                        seat: true,
                        passenger: {
                            select: {
                                dni: true,
                                name: true,
                                age: true,
                                country: true,
                            },
                        },
                    },
                },
            },
        })

        if (!flight) throw new CustomError('Flight not found', 404)

        // Convierto las propiedades de la respuesta, de snake_case a camelCase, y lo paso al controlador por el objeto Request
        req.flight = normalizeData(flight)

        next()
    } catch (error) {
        next(error)
    } finally {
        prisma.$disconnect()
    }
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, _req, res, _next) {
    const { message, status } = err

    if (status === 404) {
        console.error(message)

        res.status(status).send({
            code: res.statusCode,
            data: {},
        })
    } else {
        console.error(message)

        res.status(400).json({
            code: res.statusCode,
            errors: 'could not connect to db',
        })
    }
}
