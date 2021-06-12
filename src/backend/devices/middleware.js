
exports.hasSetStateValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body.id)
        errors.push("Falta el campo id");

    if (req.body.state) {
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