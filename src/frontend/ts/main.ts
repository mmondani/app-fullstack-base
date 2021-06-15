declare var M;


class Main  implements EventListenerObject, GETResponseListener, POSTResponseListener, DELETEResponseListener, PATCHResponseListener {
    myFramework: MyFramework;
    deviceToModify: Device;

    main () {
        this.myFramework = new MyFramework();

        // Se piden todos los devices al backend
        this.myFramework.requestGET("/devices", this);

        // Se configura el click listener para el elemento HTML que va a contener 
        // Todos los componentes creados de forma dinámica
        let mainContainerList = document.getElementById("main_container_devices");
        mainContainerList.addEventListener("click", this);

    }


    handleEvent (evt: Event): void {
        
        let elem = <HTMLInputElement>this.myFramework.getElementByEvent(evt);


        if (evt.type === "click") {
            if (elem.id === "newDevice") {
                // Se hizo click en el botón para Agregar un dispositivo.

                // Se limpian los inputs del modal para crear dispostivios
                let nameInput = <HTMLInputElement>this.myFramework.getElementById("modal_new_device_name");
                let descriptionInput = <HTMLInputElement>this.myFramework.getElementById("modal_new_device_description");
                let typeInput = <HTMLSelectElement>this.myFramework.getElementById("modal_new_device_type");
                let iconInput = <HTMLSelectElement>this.myFramework.getElementById("modal_new_device_icon");

                nameInput.value = "";
                descriptionInput.value = "";
                typeInput.value = "0";
                iconInput.value = "1.png";

                // Se lo debe llamar nuevamente para que se actualicen los select
                let elems = document.querySelectorAll('select');
                let instances = M.FormSelect.init(elems, {});

                // Se muestra el modal para crear un nuevo dispositivo
                let modal = <any>document.getElementById("modal_new_device");
                let instance = M.Modal.getInstance(modal)
                instance.open();
            }
            else if (elem.id === "modal_new_device_create") {
                // Se hizo click en el botón Crear del modal de nuevo dispositivo

                // Se obtienen los valores de cada uno de los campos
                let name = (<HTMLInputElement>this.myFramework.getElementById("modal_new_device_name")).value;
                let description = (<HTMLInputElement>this.myFramework.getElementById("modal_new_device_description")).value;
                let type = parseInt((<HTMLSelectElement>this.myFramework.getElementById("modal_new_device_type")).value);
                let icon = (<HTMLSelectElement>this.myFramework.getElementById("modal_new_device_icon")).value;

                if (name !== "" && description !== "") {
                    let newDevice = {
                        name: name,
                        description: description,
                        type: type,
                        icon: icon
                    };

                    this.myFramework.requestPOST("/devices", this, newDevice);
                }
            }
            else if (elem.id === "modal_modify_device_modify") {
                // Se hizo click en el botón Modificar del modal para modificar un dispositivo.

                // Se obtienen los valores de cada uno de los campos
                let name = (<HTMLInputElement>this.myFramework.getElementById("modal_modify_device_name")).value;
                let description = (<HTMLInputElement>this.myFramework.getElementById("modal_modify_device_description")).value;
                let icon = (<HTMLSelectElement>this.myFramework.getElementById("modal_modify_device_icon")).value;

                if (name !== "" && description !== "") {
                    let deviceModified = {
                        id: this.deviceToModify.id,
                        name: name,
                        description: description,
                        type: this.deviceToModify.type,
                        state: this.deviceToModify.state,
                        icon: icon
                    };

                    this.myFramework.requestPATCH("/devices", this, deviceModified);
                }
            }
            else {
                /**
                 * Los elemenos HTML que están dentro de la card de un device tienen ids
                 * formados de la siguiente forma:
                 *      accion_idDelDevice
                 * 
                 * Por lo tanto, a partir del id del elemento HTML, se puede encontrar qué acción
                 * se quiere hacer y sobre qué id de dispositivo
                 */
                if (elem.id.includes("_")) {
                    let elems = elem.id.split("_");
                    let action = elems[0];
                    let deviceId = parseInt(elems[1]);
                    let device = this.myFramework.getDeviceById(deviceId);
        
                    if (action === "modify") {
                        // Se hizo click en la opción Modificar del dropdown de los tres puntitos de alguna de las cards de dispositivos.

                        // Se guarda en una variable el device que se está modificando para poder recuperarlo
                        // si finalmente se modifica el device y hay que mandar el PATCH al backend
                        this.deviceToModify = device;

                        // Se cargan los inputs del modal para modificar el dispositivo
                        let nameInput = <HTMLInputElement>this.myFramework.getElementById("modal_modify_device_name");
                        let descriptionInput = <HTMLInputElement>this.myFramework.getElementById("modal_modify_device_description");
                        let iconInput = <HTMLSelectElement>this.myFramework.getElementById("modal_modify_device_icon");
                        
                        nameInput.value = device.name;
                        descriptionInput.value = device.description;
                        iconInput.value = device.icon;

                        // Se lo debe llamar nuevamente para que se actualicen los select
                        let elems = document.querySelectorAll('select');
                        let instances = M.FormSelect.init(elems, {});


                        // Se muestra el modal
                        let modal = <any>document.getElementById("modal_modify_device");
                        let instance = M.Modal.getInstance(modal)
                        instance.open();
                    }
                    else if (action === "delete") {
                        // Se hizo click en la opción Eliminar del dropdown de los tres puntitos de alguna de las cards de dispositivos
                        this.myFramework.requestDELETE("/devices/" + deviceId, this, {});
                    }
                    else if (action === "switch") {
                        // Se hizo click en el switch de alguna de las cards

                        device.state = (elem.checked)? 1 : 0;
    
                        let data = {"id": deviceId, "state": device.state}
                        this.myFramework.requestPOST("/devices/state", this, data);
                    }
                    else if (action === "slider") {
                        // Se cambió el valor del slider de alguna de las cards.

                        device.state = parseInt(elem.value)/100;
    
                        let data = {"id": deviceId, "state": device.state}
                        this.myFramework.requestPOST("/devices/state", this, data);
                    }
                }
            }
        }
        
    }

    handleGETResponse(status: number, response: string): void {
        if (status == 200) {
            // Es un response del GET a /devices. Devuelve la lista completa de dispositivos.

            let mainContainerList = document.getElementById("main_container_devices_list");

            this.myFramework.devicesList = JSON.parse(response);
            this.myFramework.devicesList.forEach(dispositivo => {  
                let newCard = new DeviceCard(dispositivo);

                this.myFramework.deivceCardsList.push(newCard);

                newCard.attach(mainContainerList);
            });
            
        }
    }

    handlePOSTResponse (status: number, url: string, response: string): void {
        if (url.endsWith("devices")){
            // Es el response de un POST /devices para crear un nuevo dispositivo
            // En response está el nuevo dispositivo. Se lo agrega a la lista de
            // dispostivos
            let newDevice: Device = JSON.parse(response);
            let newCard: DeviceCard = new DeviceCard(newDevice);

            this.myFramework.devicesList.push(newDevice);
            this.myFramework.deivceCardsList.push(newCard);

            let mainContainerList = document.getElementById("main_container_devices_list");
            newCard.attach(mainContainerList);
        }
    }

    handleDELETEResponse (status: number, response: string): void {
        if (status == 200) {
            // Es un response a un DELETE a /devices/:id
            // Si se pudo eliminar el device en el backend, se borra la card
            // que lo representa y se lo elimina del array deivceCardsList y devicesList
            let resp = JSON.parse(response);
            this.myFramework.removeDeviceById(resp.id);
            this.myFramework.removeUiComponentById(resp.id);

            let elem = document.getElementById("card_" + resp.id);
            elem.remove();
        }
    }

    handlePATCHResponse (status: number, response: string): void {
        if (status == 200) {
            // Es el response a PATCH /devicesde la modificación de alguno de los dispositivo
            // En el response viene el device como quedó luego de la modificación
            let modifiedDevice: Device = JSON.parse(response);
            
            let originalDevice = this.myFramework.getDeviceById(modifiedDevice.id);

            // Se actualizan los valores del device en devicesList
            originalDevice.name = modifiedDevice.name;
            originalDevice.description = modifiedDevice.description;
            originalDevice.icon = modifiedDevice.icon;

            // Se vuelve a dibujar la card del dispositivo
            let deviceComponent = this.myFramework.getDeviceCardById(originalDevice.id);
            deviceComponent.changeDevice(originalDevice);
        }
    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();

    
    // Se inicializan los elementos de Materialize (los modals y los dropdowns que se usan)
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems, {});

    elems = document.querySelectorAll('select');
    instances = M.FormSelect.init(elems, {});
}