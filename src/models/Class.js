import { splitClassColumnsBySections } from '../utils/index.js'
import { Section } from './Section.js'

export class Class {
    constructor(id, name, boardingPasses, dimensions) {
        this.id = id
        this.name = name
        this.sections = []
        this.assignedPassengers = []
        this.unassignedPassengers = []

        this.initSections(dimensions)
        this.splitBoardingPassesByAvailability(boardingPasses)
        this.groupUnassignedPassengersByPurchaseIdAndOrderByLength()
        this.registerAssignedSeats()
        this.fillRemainingSeatsWithPassengers()
    }

    // Divido la clase en sectores segun el id del avion (2 sectores en el avion 1 y 3 sectores en el avion 2)
    initSections(dimensions) {
        const { columns, rows } = dimensions
        const splitedColumns = splitClassColumnsBySections(columns)

        splitedColumns.forEach((sectionCols) => {
            this.sections.push(
                new Section(sectionCols, rows, this.boardingPasses)
            )
        })
    }

    // Divide los boardingPasses entre los que tienen asiento asignado y los que no
    splitBoardingPassesByAvailability(boardingPasses) {
        boardingPasses.forEach((bp) => {
            bp.seatId
                ? this.assignedPassengers.push(bp)
                : this.unassignedPassengers.push(bp)
        })
    }

    // Agrupa los pasajeros por "purchaseId" a los que no tienen asiento asignado y los ordena de mayor a menor, segun la cantidad de pasajes comprados (para asi darle prioridad a aquellas compras con mayor pasajes)
    groupUnassignedPassengersByPurchaseIdAndOrderByLength() {
        const groupedBP = this.unassignedPassengers.reduce((acc, bp) => {
            acc[bp.purchaseId]
                ? acc[bp.purchaseId].push(bp)
                : (acc[bp.purchaseId] = [bp])

            return acc
        }, {})
        const orderedBP = []

        for (const prop in groupedBP) {
            orderedBP.push(groupedBP[prop])
        }

        this.unassignedPassengers = orderedBP.sort(
            (a, b) => b.length - a.length
        )
    }

    // Registra aquellos pasajeros que ya tienen asiento asignado de manera formal
    registerAssignedSeats() {
        const allSeats = this.getAllSeats()

        for (const assignedPassenger of this.assignedPassengers) {
            const { seat } = assignedPassenger

            const seatFinded = allSeats.find((s) => {
                return (
                    s.seatRow === seat.seatRow &&
                    s.seatColumn === seat.seatColumn
                )
            })

            seatFinded?.assignSeat(assignedPassenger)
        }
    }

    // Asignar asiento a los pasajeros que no tengan, contemplando que aquellas compras con multiples pasajes esten lo mas cerca posible (los pasajeros) y la restriccion de los menores de edad (que esten cerca de un adulto)
    fillRemainingSeatsWithPassengers() {
        // this.unassignedPassengers es un arreglo de arreglos, es decir, los arreglos que contienen los arrays que son las compras de pasajes
        while (this.unassignedPassengers.length) {
            // Es el arreglo de los bps, es decir, el array de la compra y dentro los pasajes.
            const purchase = this.unassignedPassengers.shift()
            // Seccion con suficientes asientos para sentar a los pasajeros de una respectiva compra
            const section = this.getSectionWithEnoughSeats(purchase.length)

            const seniors = []
            const minors = []

            // Divido los menores con los mayores
            purchase.forEach((bp) => {
                bp.passenger.age < 18 ? minors.push(bp) : seniors.push(bp)
            })

            // Priorizo sentar los menores con un adulto, hasta que no siente todos los menores, con algun adulto, no asigno a los demas adultos.
            while (minors.length) {
                const minorWithSenior = [minors.shift(), seniors.shift()]
                // Obtengo la primer fila que encuentre en donde hayan 2 asientos contiguos
                const rowWithTwoSeats = section.getRowWithTwoEmptySeats()

                for (const seat of rowWithTwoSeats) {
                    if (!seat.isAvailable()) {
                        continue
                    } else {
                        seat.assignSeat(minorWithSenior.shift())
                    }
                }
            }

            // En este punto ya estan todos los menores asignados a un asiento junto a un adulto, asi que procedo a asignar en el sector los restantes adultos
            while (seniors.length) {
                const senior = seniors.shift()
                const availableSeat = section.getAvailableSeat()

                availableSeat.assignSeat(senior)
            }
        }
    }

    // Metodo que obtiene todas las sillas de los sectores de la clase.
    getAllSeats() {
        return this.sections.map((section) => section.seats).flat(2)
    }

    // Metodo que encuentra el primer sector, con las suficientes sillas disponibles pasadas por parametro
    getSectionWithEnoughSeats(num) {
        return this.sections.find(
            (section) => section.getNumberOfAvailableSeats() >= num
        )
    }
}
