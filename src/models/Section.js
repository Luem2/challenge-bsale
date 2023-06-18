import { Seat } from './Seat.js'

export class Section {
    constructor(columns, rows) {
        this.columns = columns
        this.rows = rows
        this.seats = []

        this.initSeats()
    }

    // Crea los asientos del sector
    initSeats() {
        let currentRow = this.rows[0]
        let lastRow = this.rows[1]

        while (currentRow <= lastRow) {
            const seatRow = []

            this.columns.forEach((col) => {
                seatRow.push(new Seat(col, currentRow))
            })

            this.seats.push(seatRow)

            currentRow++
        }
    }

    // Obtiene el numero disponibles en el sector
    getNumberOfAvailableSeats() {
        let count = null

        for (const seat of this.seats.flat()) {
            if (!seat.passenger) count++
        }

        return count
    }

    // Obtiene una fila en donde haya 2 asientos juntos y sin asignar
    getRowWithTwoEmptySeats() {
        return this.seats.find((row) => {
            let availableSeatsCount = 0

            for (let i = 0; i < row.length - 1; i++) {
                if (
                    row[i].passenger === null &&
                    row[i + 1].passenger === null
                ) {
                    availableSeatsCount = 2
                    break
                }
            }

            return availableSeatsCount === 2
        })
    }

    // Obtiene el primer asiento que encuentra disponible en el sector
    getAvailableSeat() {
        return this.seats.flat().find((seat) => !seat.passenger)
    }
}
