
/**
 * Comprueba que el request para setear el state de un device tenga en su body un objeto de la forma:
 * 
 *      {
 *          "id": 1
 *          "state": 1.0
 *      }
 * 
 * 
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 * @param {*} next llama a la siguiente función en el array de callbacks asociado al endpoint
 * @returns 
 */
exports.hasSetStateValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body.id)
        errors.push("Falta el campo id");

    if (req.body.state != undefined) {
        let state = parseFloat(req.body.state);

        if (state < 0.0 || state > 1.0)
            errors.push("state debe ser un número entre 0.0 y 1.0");
    }
    else
        errors.push("Falta el campo state");

    if (errors.length > 0)
        return res.status(400).send({errores: errors});
    else
        return next();
}


/**
 * Comprueba que el request para crear un nuevo device tenga en su body un objeto de la forma:
 * 
 *      {
 *          "name": "nombre",
 *          "description": "descripción",
 *          "type": 1
 *      }
 * 
 * 
 * @param {*} req objeto del request realizado
 * @param {*} res objeto del response al request
 * @param {*} next llama a la siguiente función en el array de callbacks asociado al endpoint
 * @returns 
 */
 exports.hasNewDeviceValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body.name)
        errors.push("Falta el campo name");

    if (!req.body.description)
        errors.push("Falta el campo description");

    if (req.body.type != undefined) {
        let type = parseInt (req.body.type);

        console.log(type);
        if (type !== 0 && type !== 1)
            errors.push("type debe valer 0 o 1");
    }
    else
        errors.push("Falta el campo type");

    if (errors.length > 0)
        return res.status(400).send({errores: errors});
    else
        return next();
}