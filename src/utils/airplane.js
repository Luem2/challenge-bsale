const airplaneOneClassesDimensions = {
    firstClass: {
        columns: ['A', 'B', 'F', 'G'],
        rows: [1, 4],
    },
    economicalPremium: {
        columns: ['A', 'B', 'C', 'E', 'F', 'G'],
        rows: [8, 15],
    },
    economical: {
        columns: ['A', 'B', 'C', 'E', 'F', 'G'],
        rows: [19, 34],
    },
}
const airplaneTwoClassesDimensions = {
    firstClass: {
        columns: ['A', 'E', 'I'],
        rows: [1, 5],
    },
    economicalPremium: {
        columns: ['A', 'B', 'D', 'E', 'F', 'H', 'I'],
        rows: [9, 14],
    },
    economical: {
        columns: ['A', 'B', 'D', 'E', 'F', 'H', 'I'],
        rows: [18, 31],
    },
}

// Funcion que segun el id recibido, devuelve las clases del avion y sus respectivas dimensiones.
export function createAirplaneClasses(id) {
    const dimensions =
        id === 1 ? airplaneOneClassesDimensions : airplaneTwoClassesDimensions
    const { firstClass, economicalPremium, economical } = dimensions

    return {
        firstClass: {
            id: 1,
            name: 'Primera clase',
            bp: [],
            dimensions: firstClass,
        },
        economicalPremium: {
            id: 2,
            name: 'Clase económica premium',
            bp: [],
            dimensions: economicalPremium,
        },
        economical: {
            id: 3,
            name: 'Clase económica',
            bp: [],
            dimensions: economical,
        },
    }
}

// Funcion para dividir las columnas (de un clase en especifico) en sectores
export function splitClassColumnsBySections(arr) {
    if (arr.length % 2 === 0) {
        const half = arr.length / 2
        return [arr.slice(0, half), arr.slice(half)]
    } else {
        if (arr.length === 3) {
            return [arr.slice(0, 1), arr.slice(1, 2), arr.slice(2, 3)]
        } else {
            return [arr.slice(0, 2), arr.slice(2, 5), arr.slice(5, 7)]
        }
    }
}
