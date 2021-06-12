let devices = require("./devices.json");

/**
 * Devuelve todos los dispositivos.
 * @returns retorna una Promise para que quede preparado para cuando los devices
 * se obtengan de una base de datos.
 */
exports.getAllDevices = () => {
    return new Promise((resolve, reject) => {
        resolve(devices);
    })
}