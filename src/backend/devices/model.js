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

/**
 * Devuelve el dispositivo ID id, si lo encuentra
 * @param {number} id ID del dispositivo que se quiere obtener
 * 
 * @returns retorna una Promise para que quede preparado para cuando los devices
 * se obtengan de una base de datos.
 */
exports.getDeviceById = (id) => {
    return new Promise ((resolve, reject) => {
        let devicesFiltered = devices.filter(device => device.id === id);

        if (devicesFiltered.length > 0)
            resolve(devicesFiltered[0]);
        else
            reject();
    });
}


/**
 * Modifica el state del device con ID id.
 * @param {object} data objeto que contiene el id del device a modificar y el nuevo state. Por ejemplo:
 * 
 *      {
 *          "id": 1,
 *          "state": 0.5
 *      }
 * 
 * @returns retorna una Promise para que quede preparado para cuando los devices
 * se obtengan de una base de datos.
 */
exports.setState = (data) => {
    return new Promise ((resolve, reject) => {
        let devicesFiltered = devices.filter(device => device.id === data.id);

        if (devicesFiltered.length > 0) {
            devicesFiltered[0].state = data.state;
            resolve(devicesFiltered[0]);
        }
        else
            reject();
    });
}


exports.newDevice