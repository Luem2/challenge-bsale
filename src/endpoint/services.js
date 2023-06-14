import { prisma } from '../config.js'

export function getAllFlights() {
    return prisma.flight.findMany({
        include: {
            aircraft: true,
            airport: true,
        },
    })
}
