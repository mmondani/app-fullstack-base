<a href="https://www.gotoiot.com/">
    <img src="doc/gotoiot-logo.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" />
</a>

Web App Full Stack Base
=======================

*Ayudaría mucho si apoyaras este proyecto con una ⭐ en Github!*

Este proyecto es una aplicación web fullstack que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un compilador de `TypeScript` que te permite utilizar este superset de JavaScript para poder programar un `cliente web`. También tiene un servicio en `NodeJS` que te permite ejecutar código en backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

La aplicación IoT de base que viene con este proyecto se encarga de crear una tabla llamada `Devices` en la base de datos, y la idea es que vos puedas desarrollar el código de backend y frontend que te permita controlar desde el navegador el estado de los devices de un hogar inteligente - *como pueden ser luces, TVs, ventiladores, persianas, enchufes y otros* - y almacenar los estados de cada uno en la base de datos. 

Realizando estas tareas vas a a tener una aplicación fullstack IoT del mundo real que utiliza tecnologías actuales en la que un backend es capaz de interactuar con una DB para cumplir con las peticiones de control que se le mandan desde el cliente web.

En esta imagen podés ver una posible implementación del cliente web que controla los artefactos del hogar.

![architecture](doc/webapp-example-1.png)

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/app-fullstack-base/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/app-fullstack-base.git
```

> En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando `docker-compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8000/](http://localhost:8000/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>

Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación podés encontrar info si querés cambiar la estructura de la DB o bien sus configuraciones de acceso.

<details><summary><b>Lee cómo configurar la aplicación</b></summary><br>

### Configuración de la DB

Como ya comprobaste, para acceder PHPMyAdmin tenés que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `docker-compose.yml`.

Para el caso del servicio de NodeJS que se comunica con la DB fijate que en el archivo `src/backend/mysql-connector.js` están los datos de acceso para ingresar a la base.

Si quisieras cambiar la contraseña, puertos, hostname u otras configuraciones de la DB deberías primero modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.

### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/smart_home.sql` para crear la base de datos automáticamente.

En ese archivo está la configuración de la tabla `Devices` y otras configuraciones más. Si quisieras cambiar algunas configuraciones deberías modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Tené en cuenta que la base de datos se crea con permisos de superusuario por lo que no podrías borrar el directorio con tu usuario de sistema, para eso debés hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Arquitectura de la aplicación

Como ya pudiste ver, la aplicación se ejecuta sobre el ecosistema Docker, y en esta imagen podés ver el diagrama de arquitectura.

![architecture](doc/architecture.png)

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos. Los estilos del código están basados en **Material Design**.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### La base de datos

La base de datos se comunica con el servicio de NodeJS y permite almacenar el estado de los dispositivos en la tabla **Devices**. Ejecuta un motor **MySQL versión 5.7** y permite que la comunicación con sus clientes pueda realizarse usando usuario y contraseña en texto plano. En versiones posteriores es necesario brindar claves de acceso, por este motivo la versión 5.7 es bastante utilizada para fases de desarrollo.

### El administrador de la DB

Para esta aplicación se usa **PHPMyAdmin**, que es un administrador de base de datos web muy utilizado y que podés utilizar en caso que quieras realizar operaciones con la base, como crear tablas, modificar columnas, hacer consultas y otras cosas más.

### El compilador de TypeScript

**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Para esta aplicación se usa un compilador de TypeScript basado en una imagen de [Harmish](https://hub.docker.com/r/harmish) en Dockerhub, y está configurado para monitorear en tiempo real los cambios que se realizan sobre el directorio **src/frontend/ts** y automáticamente generar código compilado a JavaScript en el directorio  **src/frontend/js**. Los mensajes del compilador aparecen automáticamente en la terminal al ejecutar el comando **docker-compose up**.

### Ejecución de servicios

Los servicios de la aplicación se ejecutan sobre **contenedores de Docker**, así se pueden desplegar de igual manera en diferentes plataformas. Los detalles sobre cómo funcionan los servicios los podés ver directamente en el archivo **docker-compose.yml**.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── smart_home.sql      # estructura con la base de datos "smart_home"
├── doc                         # documentacion general del proyecto
└── src                         # directorio codigo fuente
│   ├── backend                 # directorio para el backend de la aplicacion
│   │   ├── index.js            # codigo principal del backend
│   │   ├── mysql-connector.js  # codigo de conexion a la base de datos
│   │   ├── package.json        # configuracion de proyecto NodeJS
│   │   └── package-lock.json   # configuracion de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicacion
│       ├── js                  # codigo javascript que se compila automáticamente
│       ├── static              # donde alojan archivos de estilos, imagenes, fuentes, etc.
│       ├── ts                  # donde se encuentra el codigo TypeScript a desarrollar
│       └── index.html          # archivo principal del cliente HTML
├── docker-compose.yml          # archivo donde se aloja la configuracion completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

> No olvides ir poniendo tus cambios en el archivo `CHANGELOG.md` a medida que avanzas en el proyecto.

</details>

## Detalles de implementación 💻

En esta sección se describen los destalles específicos de funcionamiento del código.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Agregar un dispositivo

Para agregar un dispositivo, en el dashboard principal se debe hacer click en el botón `Agregar Dispositivo`.

![dashboard](doc/dashboard.png)

Una vez hecho esto, aparecerá un popup que permite elegir un ícono, un nombre, una descripción y un tipo para el nuevo dispositivo.

![new_device](doc/new_device.png)

Al hacer click en `Crear`, se va a agregar el nuevo dispositivo.

Por otro lado, cualquier dispositivo creado puede ser modificado, permitiendo cambiarle su nombre, su descripción o su ícono. Para modificarlo, se debe hacer click en los tres puntitos arriba a la derecha de la tarjeta del dispositivo:

![edit_device1](doc/edit_device1.png)

En el menú que se abre, se debe elegir la opción `Modificar`:

![edit_device2](doc/edit_device2.png)

Finalmente, se va a abrir un popup en el que se puede cambiar cualquiera de los datos. Para completar el proceso de modificación se debe presionar el botón `Modificar` del popup.

![edit_device2](doc/edit_device3.png)

Además, en el mismo menú de los tres puntitos, se puede elegir la opción `Eliminar`, para borrar el dispositivo.

### Frontend

En `index.html` se establece la estructura básica del dashboard, el cual luego va a ser llenado con los dispositivos. Esta estructura está compuesta por:
- botón con id `newDevice`: al hacer click se va a mostrar un popup para agregar un dispositivo.
- `<div>` con id `main_container_devices_list`: va a contener las card que representan a cada uno de los dispositivos.
- `<div>` con id `modal_new_device`: el `<div>` usa la clase modal, para representar un popup. Se lo incluye en el HTML ya que solo se lo va a mostrar cuando se lo requiera. Este popup va a ser usado para crear un nuevo dispositivo.
- `<div>` con id `modal_modify_device`: al igual que `modal_new_device` usa la clase modal y va a representar un popup que se va a mostrar cuando se quiera modificar un dispositivo existente.

La **entidad "dispositivo"** va a ser representada en el frontend a través de la clase `Device` (archivo `device.ts`). Esta clase contiene los siguientes campos:
- `id`: es de tipo number y es un número único asignado por el backend que identifica a ese dispositivo.
- `name`: es de tipo string y es el nombre del dispositivo.
- `description`: es de tipo string y es la descripción del dispositivo.
- `state`: es de tipo number y va a contener un número entre 0.0 y 1.0. En el caso de los dispositivos de tipo On/Off esta variable va a valer 0.0 o 1.0. En el caso de los dimerizables, va a valer cualquier número entre 0.0 y 1.0.
- `type`: es de tipo number e indica el tipo de dispositivo. 0 para los On/Off y 1 para los dimerizables.
- `icon`: es de tipo string y contiene el nombre de la imagen que se usa como ícono.

La **lógica principal** del frontend se implementa en la clase `Main` (en el archivo `main.ts`). En esta clase básicamente se hacen tres cosas:
- Inicialización: en el método `main` de la clase se crea una instancia de la clase `MyFramework` la cual va a brindar algunas herramientas usadas por la clase `Main`. Además se hace un request (GET a `/devices`) al backend para pedir todos los dispositivos a mostrar. Finalmente se indica que la clase `Main` va a ser la que reciba los eventos `click` del dashboard. Para esto, la clase `Main` implementa la interfaz `EventListenerObject`.
- Manejo de eventos: la clase main (en su método `handleEvent`) va a recibir todos los eventos de click que se hagan en cualquier elemento HTML que esté dentro del `<div>` con id `main_container_devices`. Este `<div>` contiene el botón para agregar dispositivos, las cards de todos los dispositivos y los dos modals antes explicados. Se eligió configurar un único event listener en este `<div>` ya que parte de la web va a ser generada de forma dinámica en función de los dispositivos que haya que mostrar.
Dentro de este método, dependiendo del id del elemento HTML sobre el que se hizo click, se van a realizar diferentes acciones:
  - `newDevice`: se hizo click en el botón para agregar un dispositivo. Se va a mostrar el modal `modal_new_device` en el que se van a cargar los valores de cada uno de los campos de un nuevo equipo.
  - `modal_new_device_create`: se hizo click en el botón Crear del modal `modal_new_device`, por lo que se recuperan los valores de los elementos del formulario contenido en ese modal y se realiza un `POST` al endpoint `/devices` para darlo de alta en el backend.
  - `modal_modify_device_modify`: se hizo click en el botón Modificar del modal `modal_modify_device` para modificar un dispositivo ya existente. Se recuperan los valores de los elementos del formulario de ese modal y se realiza un `PATCH` al endpoint `/devices` para modificar el dispositivo en el backend.
  - Todos los elementos clickeables de las cards que representan a los dispositivos tienen un id con el siguiente formato: `opcion_id`. Es decir, cada elemento, en su id contiene qué hace ese botón y el ID del dispostivo sobre lo que se quiere hacer la acción:
    - `modify`: se hizo click en la opción Modificar del dropdown que se abre al hacer click en los tres puntitos de la card del dispositivo con ID `id`. Se va a mostrar el modal `modal_modify_device` cargando en los elementos del formulario los valores actuales del dispositivo. Además se va a guardar la referencia al dispositivo que se está modificando en la variable `deviceToModify` para poder recuperar el resto de los campos si finalmente se completa la operación de modificación.
    - `delete`: se hizo click en la opción Eliminar del dropdown que se abre al hacer click en los tres puntitos de la card del dispositivo con ID `id`. Se realiza un `DELETE` al endpoint `/devices/:id` para borrarlo en el backend.
    - `switch`: se hizo click en el switch de la card del dispositivo con ID `id`. Se cambia el estado del dispositivo y se envía un `POST` al endpoint `/devices/state` para cambiarlo en el backend.
    - `slider`: se cambió el valor del slider de la card del dispositivo con ID `id`. Se cambia el estado del dispositivo y se envía un `POST` al endpoint `/devices/state` para cambiarlo en el backend.
- Manejo de las responses de los requests: en cada uno de los requests se fija que el resultado de esa operación debe ser devuelta a la instancia de `Main`. Para manejar estos callback, la clase `Main` implementa varias interfaces: `GETResponseListener`, `POSTResponseListener`, `DELETEResponseListener` y `PATCHResponseListener`.
  - `handleGETResponse`: va a procesar el response al GET enviado a `/devices`. El body del response va a contener un array con todos los dispositivos existentes. Por cada uno de esos dispositivos va a crear una instancia de la clase `DeviceCard` (explicada más adelante) y el código HTML que genera se lo va a agregar al elemento HTML `main_container_devices_list` para que muestre la card.
  - `handlePOSTResponse`: va a procesar el response al POST `/devices` para crear un nuevo dispositivo. En el body del response viene el dispositivo creado. Se crea una instancia de la clase `DeviceCard` y se la agrega al HTML.
  - `handleDELETEResponse`: procesa el response al DELETE `/devices/:id`. Elimina la card del HTML correspondiente al dispositivo eliminado.
  - `handlePATCHResponse`: procesa el response al PATCH `/devices`. En el body del response viene el dispositivo modificado. Se modifica la instancia de `DeviceCard` correspondiente a ese dispositivo y se modifica el código HTML asociado.

La clase **MyFramework** tiene varios métodos de utilidad para poder acceder a los elementos del DOM y generar requests al backend. Además tiene dos arrays: el primero contiene la lista de dispositivos que se obtuvo del backend y el segundo es la lista de `DeviceCard` que se agregaron al HTML. La clase `Main` va a consultar estos dos arrays para generar el dashboard.

Finalmente, la clase **DeviceCard** se la utiliza para representar un dispositivo en HTML. Al crear una instancia, se le pasa una instancia de la clase `Device` y genera el código HTML necesario para dibujar una card que la represente. Luego, mediante el método `attach` de la clase `DeviceCard` se le indica a qué elemento del DOM se debe agregar este código HTML de la `DeviceCard`. También incluye el método `changeDevice` para volver a generar el código HTML de la card cuando cambia la instancia de `Device` que tiene que representar.

### Backend

El backend implementa una API REST. La lógica relacionada al CRUD de los devices se divide en tres capas:
- devices/model.js: contiene las funciones que interactuan directamente con la fuente de datos. En este caso los datos se obtienen de un archivo local y todos los cambios se mantienen en RAM, no se vuelven a persistir.
- devices/middleware.js: contiene funciones encargadas de chequear la validez en cuanto a formato de los requests. Estas funciones van a ser llamadas al procesar los requests antes de efectivamente ejecutar la función que implementa la lógica de ese endpoint
- devices/controller.js: contiene las funciones que implementan la lógica propiamente dicha del endpoint.

En la carpeta **doc** se va a encontrar el archivo *Backend Smart Home.postman_collection.json* el cual es una colección de Postman con ejemplos de requests a los endpoints que a continuación se explican.

<details><summary><b>Ver los endpoints disponibles</b></summary><br>

<summary>1) Obtener todos los dispositivos</summary>
<details>

* **URL:** /devices

* **Método:** `GET`
  
*  **Parámetros URL:** -

*  **Body:** -

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** array con todos los dispositivos
    <br>
    *Ejemplo*
    ```json
    [
        {
            "id": 1,
            "name": "Lámpara 1",
            "description": "Luz Living",
            "state": 1,
            "type": 0,
            "icon": "1.png"
        },
        {
            "id": 2,
            "name": "Lámpara 2",
            "description": "Luz Cocina",
            "state": 0,
            "type": 0,
            "icon": "1.png"
        }
    ]
    ```
 
* **Respuesta fallida:**

  * **Código:** 500 <br />
    **Body:** -
</details>

<summary>2) Obtener un dispositivo</summary>
<details>

* **URL:** /devices/:id

* **Método:** `GET`
  
*  **Parámetros URL:**
 
   `id=[number]`: ID del device que se está consultando.

*  **Body:** -

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** device con ID id
    <br>
    *Ejemplo*
    ```json
    {
        "id": 1,
        "name": "Lámpara 1",
        "description": "Luz Living",
        "state": 1,
        "type": 0,
        "icon": "1.png"
    }
    ```
 
* **Respuesta fallida:**

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - No se encuentra el id<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["No se encuentra el id"]
    }
    ```
</details>

<summary>3) Modificar el estado de un dispositivo</summary>
<details>

* **URL:** /devices/state

* **Método:** `POST`
  
*  **Parámetros URL:** -

*  **Body:**
   
    **Obligatorios:**
 
   `id=[number]`: ID del device.<br/>
   `state=[number]`: número entre 0.0 y 1.0 que indica el estado del device.
   <br/>
   *Ejemplo*
    ```json
    {
        "id": 1,
        "state": 0.7
    }
    ```

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** device con el nuevo ID
    <br>
    *Ejemplo*
    ```json
    {
        "id": 1,
        "name": "Lámpara 1",
        "description": "Luz Living",
        "state": 0.7,
        "type": 0,
        "icon": "1.png"
    }
    ```
 
* **Respuesta fallida:**

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - No se encuentra el id<br />
                - Falta el campo id<br />
                - Falta el campo state<br />
                - state debe ser un número entre 0.0 y 1.0<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["No se encuentra el id"]
    }
    ```
</details>

<summary>4) Crear un nuevo dispositivo</summary>
<details>

* **URL:** /devices

* **Método:** `POST`
  
*  **Parámetros URL:** -

*  **Body:**
   
    **Obligatorios:**
 
   `name=[string]`: nombre del nuevo device.<br/>
   `description=[string]`: descripción del nuevo device.<br/>
   `type=[number]`: tipo de dispositivo. 0 para dispositivo ON-OFF, 1 para dispositivo dimerizable.<br/>
   `icon=[string]`: nombre de la imagen que representa el ícono asociado al device<br/>
   <br/>
   *Ejemplo*
    ```json
    {
        "name": "nombre",
        "description": "descripción",
        "type": 1,
        "icon": "1.png"
    }
    ```

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** device creado
    <br>
    *Ejemplo*
    ```json
    {
        "id": 1,
        "name": "Lámpara 1",
        "description": "Luz Living",
        "state": 0.7,
        "type": 0
    }
    ```
 
* **Respuesta fallida:**

  * **Código:** 500 <br />
    **Body:** -

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - Falta el campo name<br />
                - Falta el campo description<br />
                - Falta el campo type<br />
                - Falta el campo icon<br />
                - type debe valer 0 o 1<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["type debe valer 0 o 1"]
    }
    ```
</details>

<summary>5) Modificar un dispositivo existente</summary>
<details>

* **URL:** /devices

* **Método:** `PATCH`
  
*  **Parámetros URL:** -

*  **Body:**
   
    **Obligatorios:**
 
   `id=[number]`: ID del device a modificar.<br/>
   `name=[string]`: nuevo nombre del device.<br/>
   `description=[string]`: nueva descripción del device.<br/>
   `state=[number]`: número entre 0.0 y 1.0 que indica el nuevo estado del device.<br/>
   `icon=[string]`: nombre de la imagen que representa el ícono asociado al device<br/>
   <br/>
   *Ejemplo*
    ```json
    {
        "id": 34534534
        "name": "nombre",
        "description": "descripción",
        "state": 1,
        "icon": "3.png"
    }
    ```

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** device modificado
    <br>
    *Ejemplo*
    ```json
    {
        "id": 34534534,
        "name": "nombre",
        "description": "descripción",
        "state": 1,
        "type": 0,
        "icon": "3.png"
    }
    ```
 
* **Respuesta fallida:**

  * **Código:** 500 <br />
    **Body:** -

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - No se encuentra el id<br />
                - Falta el campo id<br />
                - Falta el campo name<br />
                - Falta el campo description<br />
                - Falta el campo state<br />
                - Falta el campo icon<br />
                - state debe ser un número entre 0.0 y 1.0<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["No se encuentra el id"]
    }
    ```
</details>


<summary>6) Eliminar un dispositivo</summary>
<details>

* **URL:** /devices/:id

* **Método:** `DELETE`
  
*  **Parámetros URL:**
 
   `id=[number]`: ID del device que se quiere eliminar.

*  **Body:** -

* **Respuesta exitosa:**

  * **Código:** 200 <br />
    **Body:** ID eliminado
    <br>
    *Ejemplo*
    ```json
    {
        "id": 1,
    }
    ```
 
* **Respuesta fallida:**

  * **Código:** 400 <br />
    **Body:** objeto indicando el error. Posibles errores:<br />
                - No se encuentra el id<br />
    <br>
    *Ejemplo*
    ```json
    {
        "errores": ["No se encuentra el id"]
    }
    ```
</details>


</details>

</details>


## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Material Design](https://material.io/design) - Bibliotecas de estilo responsive para aplicaciones web.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si estás interesado en el proyecto y te gustaría sumar fuerzas para que siga creciendo y mejorando, podés abrir un hilo de discusión para charlar tus propuestas en [este link](https://github.com/gotoiot/app-fullstack-base/issues/new). Así mismo podés leer el archivo [Contribuir.md](https://github.com/gotoiot/gotoiot-doc/wiki/Contribuir) de nuestra Wiki donde están bien explicados los pasos para que puedas enviarnos pull requests.

## Sobre Goto IoT 📖

Goto IoT es una plataforma que publica material y proyectos de código abierto bien documentados junto a una comunidad libre que colabora y promueve el conocimiento sobre IoT entre sus miembros. Acá podés ver los links más importantes:

* **[Sitio web](https://www.gotoiot.com/):** Donde se publican los artículos y proyectos sobre IoT. 
* **[Github de Goto IoT:](https://github.com/gotoiot)** Donde están alojados los proyectos para descargar y utilizar. 
* **[Comunidad de Goto IoT:](https://groups.google.com/g/gotoiot)** Donde los miembros de la comunidad intercambian información e ideas, realizan consultas, solucionan problemas y comparten novedades.
* **[Twitter de Goto IoT:](https://twitter.com/gotoiot)** Donde se publican las novedades del sitio y temas relacionados con IoT.
* **[Wiki de Goto IoT:](https://github.com/gotoiot/doc/wiki)** Donde hay información de desarrollo complementaria para ampliar el contexto.

## Muestas de agradecimiento 🎁

Si te gustó este proyecto y quisieras apoyarlo, cualquiera de estas acciones estaría más que bien para nosotros:

* Apoyar este proyecto con una ⭐ en Github para llegar a más personas.
* Sumarte a [nuestra comunidad](https://groups.google.com/g/gotoiot) abierta y dejar un feedback sobre qué te pareció el proyecto.
* [Seguirnos en twitter](https://github.com/gotoiot/doc/wiki) y dejar algún comentario o like.
* Compartir este proyecto con otras personas.

## Autores 👥

Las colaboraciones principales fueron realizadas por:

* **[Agustin Bassi](https://github.com/agustinBassi)**: Ideación, puesta en marcha y mantenimiento del proyecto.
* **[Ernesto Giggliotti](https://github.com/ernesto-g)**: Creación inicial del frontend, elección de Material Design.
* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

También podés mirar todas las personas que han participado en la [lista completa de contribuyentes](https://github.com/###/contributors).

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.

---

**Copyright © Goto IoT 2021** ⌨️ [**Website**](https://www.gotoiot.com) ⌨️ [**Group**](https://groups.google.com/g/gotoiot) ⌨️ [**Github**](https://www.github.com/gotoiot) ⌨️ [**Twitter**](https://www.twitter.com/gotoiot) ⌨️ [**Wiki**](https://github.com/gotoiot/doc/wiki)
