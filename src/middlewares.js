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
