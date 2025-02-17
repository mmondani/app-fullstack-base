const DeviceModel = require("./model");

/**
 * Devuelve todos los devices.
 * Si la operación es exitosa, retorna un código 200 y el array de dispositivos en el body.
 * Si la operación falla, retorna un código 500.
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.getAll = async (req, res) => {
    try {
        let devices = await DeviceModel.getAllDevices();
        res.status(200).send(devices);
    }
    catch (error) {
        res.status(500).send();
    }
}

/**
 * Devuelve el device cuyo ID es igual a req.params.id.
 * Si la operación es exitosa, retorna un código 200 y el device en cuestión en el body.
 * Si la operación falla, retorna un código 400.
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.getById = async (req, res) => {
    try {
        let device = await DeviceModel.getDeviceById(parseInt(req.params.id));
        res.status(200).send(device);
    }
    catch (error) {
        res.status(400).send({errores: ["No se encuentra el id"]});
    }
}

/**
 * Modifica el state del device con ID id. En el body debe haber un objeto con el siguiente formato:
 * 
 *      {
 *          "id": 1,
 *          "state": 0.5
 *      }
 * 
 * Si la operación es exitosa, retorna un código 200 y el device en cuestión en el body.
 * Si la operación falla, retorna un código 400.
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.setState = async (req, res) => {
    try {
        let device = await DeviceModel.setState(req.body);
        res.status(200).send(device);
    }
    catch (error) {
        res.status(400).send({errores: ["No se encuentra el id"]});
    }
}


/**
 * Crea un nuevo device. En el body debe haber un objeto con el siguiente formato:
 * 
 *      {
 *          "name": "nombre",
 *          "description": "descripción",
 *          "type": 1,
 *          "icon": "3.png"
 *      }
 * 
 * Si la operación es exitosa, retorna un código 200 y el device creado.
 * Si la operación falla, retorna un código 500.
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.newDevice = async (req, res) => {
    try {
        let device = await DeviceModel.newDevice(req.body);
        res.status(200).send(device);
    }
    catch (error) {
        res.status(500).send();
    }
}


/**
 * Modifica los campos de un device existente. En el body debe haber un objeto con el siguiente formato:
 * 
 *      {
 *          "id": 245997,
 *          "name": "nombre",
 *          "description": "descripción",
 *          "state": 0.3,
 *          "icon": "2.png"
 *      }
 * 
 * Si la operación es exitosa, retorna un código 200 y el device modificado.
 * Si la operación falla, retorna un código 500 o un 400 si no encuentra el device
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.modifyDevice = async (req, res) => {
    try {
        let device = await DeviceModel.modifyDevice(req.body);
        res.status(200).send(device);
    }
    catch (error) {
        if (error == "No existe el dispositivo")
            res.status(400).send({errores:["No existe el dispositivo"]});
        else 
            res.status(500).send();
    }
}


/**
 * Elimina el device cuyo ID es igual a req.params.id.
 * Si la operación es exitosa, retorna un código 200 y el ID del device eliminado.
 * Si la operación falla, retorna un código 400.
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 */
exports.deleteDevice = async (req, res) => {
    try {
        let deletedDevice = await DeviceModel.deleteDevice(parseInt(req.params.id));
        res.status(200).send(deletedDevice);
    }
    catch (error) {
        res.status(400).send({errores: ["No se encuentra el id"]});
    }
}