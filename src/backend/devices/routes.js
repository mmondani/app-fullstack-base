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
     *              "type": 0,
     *              "icon": "1.png"
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
     *          "type": 0,
     *          "icon": "1.png"
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
     * Parámetros URL: -
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
     *          "type": 0,
     *          "icon": "1.png"
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
    app.post("/devices/state", [
        DeviceMiddleware.hasSetStateValidFields,
        DeviceController.setState
    ]);


    /**
     * Permite crear un nuevo device
     *
     * Parámetros URL: -
     * 
     * Body: 
     *      Campos obligatorios
     *          name [string]: nombre del nuevo device
     *          description [string]: descripción del nuevo device
     *          type [numer]: tipo de dispositivo. 0 para dispositivo ON-OFF, 1 para dispositivo dimerizable
     * 
     *      Ejemplo:
     *      {
     *          "name": "nombre",
     *          "description": "descripción",
     *          "type": 1
     *      }
     * 
     * Respuesta existosa:
     *      Código: 200
     *      Body: device creado
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
     *      Código: 500
     *      Body: -
     * 
     *      Código: 400
     *      Body: objeto indicando el/los error/es. 
     *            Posibles errores:
     *              - Falta el campo name
     *              - Falta el campo description
     *              - Falta el campo type
     *              - type debe valer 0 o 1
     * 
     *      {
     *          "errores": ["type debe valer 0 o 1"]
     *      }
     */
    app.post("/devices", [
        DeviceMiddleware.hasNewDeviceValidFields,
        DeviceController.newDevice
    ])



   /**
     * Permite modificar un device ya existente
     *
     * Parámetros URL: -
     * 
     * Body: 
     *      Campos obligatorios
     *          id [number]: ID del device a modificar
     *          name [string]: nuevo nombre del device
     *          description [string]: nueva descripción del device
     *          state [numer]: número entre 0.0 y 1.0 que indica el nuevo estado del device
     * 
     *      Ejemplo:
     *      {
     *          "id": 34534534
     *          "name": "nombre",
     *          "description": "descripción",
     *          "state": 1,
     *          "icon": "1.png"
     *      }
     * 
     * Respuesta existosa:
     *      Código: 200
     *      Body: device modificado
     * 
     *      Ejemplo:
     *      {
     *          "id": 34534534,
     *          "name": "nombre",
     *          "description": "descripción",
     *          "state": 1,
     *          "type": 0,
     *          "icon": "1.png"
     *      }
     * 
     * Respuesta fallida:
     *      Código: 500
     *      Body: -
     * 
     *      Código: 400
     *      Body: objeto indicando el/los error/es. 
     *            Posibles errores:
     *              - No se encuentra el id
     *              - Falta el campo id
     *              - Falta el campo name
     *              - Falta el campo description
     *              - Falta el campo state
     *              - Falta el campo icon
     *              - state debe ser un número entre 0.0 y 1.0
     * 
     *      {
     *          "errores": ["No se encuentra el id"]
     *      }
     */
    app.patch("/devices", [
        DeviceMiddleware.hasModifyDeviceValidFields,
        DeviceController.modifyDevice
    ])


    /**
     * Permite eliminar el device con ID id
     *
     * Parámetros URL:
     *      id [number]: ID del device que se quiere eliminar
     * 
     * Body: -
     * 
     * Respuesta existosa:
     *      Código: 200
     *      Body: ID eliminado
     * 
     *      Ejemplo:
     *      {
     *          "id": 1,
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
    app.delete("/devices/:id", [
        DeviceController.deleteDevice
    ])
}