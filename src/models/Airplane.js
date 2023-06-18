import { createAirplaneClasses } from '../utils/index.js'
import { Class } from './Class.js'
export class Airplane {
    constructor(id, boardingPasses) {
        this.id = id
        this.classes = []

        this.initAirplane(boardingPasses)
    }

    // Crea las 3 clases del avion.
    initAirplane(boardingPasses) {
        const splitedBoardingPassesByClass =
            this.assignBoardingPassesByClass(boardingPasses)

        for (const prop in splitedBoardingPassesByClass) {
            const { id, name, bp, dimensions } =
                splitedBoardingPassesByClass[prop]

            this.classes.push(new Class(id, name, bp, dimensions))
        }
    }

    // Asigna los boardingPasses a sus respectivas clases
    assignBoardingPassesByClass(rawBoardingPasses) {
        const airplaneClasses = createAirplaneClasses(this.id)
        const { firstClass, economicalPremium, economical } = airplaneClasses

        rawBoardingPasses.forEach((bp) => {
            if (bp.seatTypeId === 1) {
                firstClass.bp.push(bp)
            } else if (bp.seatTypeId === 2) {
                economicalPremium.bp.push(bp)
            } else {
                economical.bp.push(bp)
            }
        })

        return airplaneClasses
    }

    // Devuelve la lista de todos los pasajeros del avion (parte de la respuesta final)
    getAllPassengers() {
        const sections = this.classes.map((cl) => cl.sections).flat()
        const seats = sections.map((section) => section.seats).flat(2)
        const passengers = seats.map((seat) => seat.passenger)

        return passengers.filter((passenger) => passenger !== null)
    }
}
