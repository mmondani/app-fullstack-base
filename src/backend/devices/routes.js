const DeviceController = require("./controller");


/**
 * Agrega al objeto app de express las rutas relacionadas con el módulo
 * de devices
 * @param  app objeto de express
 */
module.exports = (app) => {

    /**
     * Permite obtener toda la lista de dispositivos
     * Parámetros URL: -
     * Body: -
     * Respuesta existosa:
     *      Código: 200
     *      Body: array con todos los dispositivos
     * 
     *      Ejemplo:
     *      [
     *          {
     *              "id": 1,
     *              "name": "Lámpara 1",
     *              "description": "Luz Living",
     *              "state": 1,
     *              "type": 0
     *          }
     *      ]
     * 
     * Respuesta fallida:
     *      Código: 500
     *      Body: -
     */
    app.get("/devices", [
        DeviceController.getAll
    ])
}