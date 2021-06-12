const DeviceModel = require("./model");

/**
 * Le pide al model todos los devices.
 * Si la operación es existosa, retorna un código 200 y el array de dispositivos en el body.
 * Si la operación falla, retorna un código 500.
 * @param req objeto del request realizado
 * @param res objeto del response al request
 */
exports.getAll = async (req, res) => {
    try {
        let devices = await DeviceModel.getAllDevices();
        res.status(200).send(devices);
    }catch (error) {
        res.status(500).send();
    }
}