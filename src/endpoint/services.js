import { prisma } from '../config.js'
import { CustomError } from '../utils/customError.js'
import { normalizeData } from '../utils/normalizeProp.js'

export async function getFlight(paramsId) {
    const id = Number(paramsId)

    if (typeof id !== 'number')
        throw new CustomError('The id is required, and must be a number', 400)

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

    return normalizeData(flight)
}
