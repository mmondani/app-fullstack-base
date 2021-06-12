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
 * Si la operación es exitosa, reotrna un código 200 y el device en cuestión en el body.
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


exports.setState = async (req, res) => {
    try {
        let device = await DeviceModel.setState(req.body);
        res.status(200).send(device);
    }
    catch (error) {
        res.status(400).send({errores: ["No se encuentra el id"]});
    }
}