/**
 * @class CustomError
 * @extends Error
 */
export class CustomError extends Error {
    /**
     * @constructor
     * @param {string} message - El mensaje de error.
     * @param {number} status - El estado de error (400 o 404).
     * @description Crea un nuevo objeto de tipo CustomError. El error 404 es cuando no encontró el vuelo, y 400 por cualquier otro error.
     */
    constructor(message, status) {
        super(message)
        /**
         * El estado de error.
         * @type {number}
         */
        this.status = status
    }
}
