import { randomUUID } from 'crypto'

export class Seat {
    constructor(seatColumn, seatRow, passenger = null) {
        this.seatColumn = seatColumn
        this.seatRow = seatRow
        this.passenger = passenger
    }

    // Metodo que retorna un boolean, si esta ocupado o no
    isAvailable() {
        return !this.passenger
    }

    // Recibe un pasajero, y lo registra en el asiento
    assignSeat(rawPassenger) {
        if (this.isAvailable() && rawPassenger) {
            const {
                boardingPassId,
                purchaseId,
                passengerId,
                seatTypeId,
                seatId,
                passenger,
            } = rawPassenger

            this.passenger = {
                passengerId,
                ...passenger,
                boardingPassId,
                purchaseId,
                seatTypeId: seatTypeId,
                seatId: seatId ?? randomUUID(),
            }
        }
    }
}
