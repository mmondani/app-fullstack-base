const DeviceController = require("./controller");
const DeviceMiddleware = require("./middleware");


/**
 * Agrega al objeto app de express las rutas relacionadas con el módulo
 * de devices
 * @param  app objeto de express
 */
module.exports = (app) => {

    /**
     * Permite obtener toda la lista de dispositivos
     * 
     * Parámetros URL: -
     * 
     * Body: -
     * 
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
    ]);


    /**
     * Permite obtener el device con ID id
     *
     * Parámetros URL:
     *      id [number]: ID del device que se está consultando
     * 
     * Body: -
     * 
     * Respuesta existosa:
     *      Código: 200
     *      Body: device con ID id
     * 
     *      Ejemplo:
     *      {
     *          "id": 1,
     *          "name": "Lámpara 1",
     *          "description": "Luz Living",
     *          "state": 1,
     *          "type": 0
     *      }
     * 
     * Respuesta fallida:
     *      Código: 400
     *      Body: objeto indicando el error
     *            Posibles errores:
     *              - No se encuentra el id
     * 
     *      {
     *          "errores": ["No se encuentra el id"]
     *      }
     */
    app.get("/devices/:id", [
        DeviceController.getById
    ]);


    /**
     * Permite modificar el estado del deivce con ID id
     *
     * Parámetros URL:
     * 
     * Body: 
     *      Campos obligatorios
     *          id [number]: ID del device
     *          state [numer]: número entre 0.0 y 1.0 que indica el estado del device
     * 
     *      Ejemplo:
     *      {
     *          "id": 1,
     *          "state": 0.7
     *      }
     * 
     * Respuesta existosa:
     *      Código: 200
     *      Body: device con el nuevo state
     * 
     *      Ejemplo:
     *      {
     *          "id": 1,
     *          "name": "Lámpara 1",
     *          "description": "Luz Living",
     *          "state": 0.7,
     *          "type": 0
     *      }
     * 
     * Respuesta fallida:
     *      Código: 400
     *      Body: objeto indicando el/los error/es. 
     *            Posibles errores:
     *              - No se encuentra el id
     *              - Falta el campo id
     *              - Falta el campo state
     *              - state debe ser un número entre 0.0 y 1.0
     * 
     *      {
     *          "errores": ["No se encuentra el id"]
     *      }
     */
    app.post("/devices", [
        DeviceMiddleware.hasSetStateValidFields,
        DeviceController.setState
    ]);
}