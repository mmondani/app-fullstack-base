declare var M;


class Main  implements EventListenerObject, GETResponseListener, POSTResponseListener, DELETEResponseListener, PATCHResponseListener {
    myFramework: MyFramework;
    clicks: number = 0;
    listaDispositivos: Array<Device> = [];
    listaComponentes: Array<UiComponent> = [];
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
                // Se limpian los inputs del modal para crear dispostivios
                let nameInput = <HTMLInputElement>this.myFramework.getElementById("modal_new_device_name");
                let descriptionInput = <HTMLInputElement>this.myFramework.getElementById("modal_new_device_description");
                let typeInput = <HTMLInputElement>this.myFramework.getElementById("modal_new_device_type");

                nameInput.value = "";
                descriptionInput.value = "";
                typeInput.value = "0";

                // Se muestra el modal para crear un nuevo dispositivo
                let modal = <any>document.getElementById("modal_new_device");
                let instance = M.Modal.getInstance(modal)
                instance.open();
            }
            else if (elem.id === "modal_new_device_create") {
                // Se obtienen los valores de cada uno de los campos
                let name = (<HTMLInputElement>this.myFramework.getElementById("modal_new_device_name")).value;
                let description = (<HTMLInputElement>this.myFramework.getElementById("modal_new_device_description")).value;
                let type = parseInt((<HTMLInputElement>this.myFramework.getElementById("modal_new_device_type")).value);

                if (name !== "" && description !== "") {
                    let newDevice = {
                        name: name,
                        description: description,
                        type: type
                    };

                    this.myFramework.requestPOST("/devices", this, newDevice);
                }
            }
            else if (elem.id === "modal_modify_device_modify") {
                // Se obtienen los valores de cada uno de los campos
                let name = (<HTMLInputElement>this.myFramework.getElementById("modal_modify_device_name")).value;
                let description = (<HTMLInputElement>this.myFramework.getElementById("modal_modify_device_description")).value;

                if (name !== "" && description !== "") {
                    let deviceModified = {
                        id: this.deviceToModify.id,
                        name: name,
                        description: description,
                        type: this.deviceToModify.type,
                        state: this.deviceToModify.state
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
                    let device = this.getDeviceById(deviceId);
                    let uiComponent = this.getUiComponentById(deviceId);
        
                    if (evt.type === "click") {
                        if (action === "modify") {
                            // Se guarda en una variable el device que se está modificando para poder recuperarlo
                            // si finalmente se modifica el device y hay que mandar el PATCH al backend
                            this.deviceToModify = device;

                            // Se cargan los inputs del modal para modificar el dispositivo
                            let nameInput = <HTMLInputElement>this.myFramework.getElementById("modal_modify_device_name");
                            let descriptionInput = <HTMLInputElement>this.myFramework.getElementById("modal_modify_device_description");
                            
                            nameInput.value = device.name;
                            descriptionInput.value = device.description;


                            // Se muestra el modal
                            let modal = <any>document.getElementById("modal_modify_device");
                            let instance = M.Modal.getInstance(modal)
                            instance.open();
                        }
                        else if (action === "delete") {
                            this.myFramework.requestDELETE("/devices/" + deviceId, this, {});
                        }
                        else if (action === "switch") {
                            device.state = (elem.checked)? 1 : 0;
        
                            let data = {"id": deviceId, "state": device.state}
                            this.myFramework.requestPOST("/devices/state", this, data);
                        }
                        else if (action === "slider") {
                            device.state = parseInt(elem.value)/100;
        
                            let data = {"id": deviceId, "state": device.state}
                            this.myFramework.requestPOST("/devices/state", this, data);
                        }
                    }
                }
            }
        }
        
    }

    handleGETResponse(status: number, response: string): void {
        if (status == 200) {
            let mainContainerList = document.getElementById("main_container_devices_list");

            this.listaDispositivos = JSON.parse(response);
            this.listaDispositivos.forEach(dispositivo => {  
                let newCard = new DeviceCard(dispositivo);

                this.listaComponentes.push(newCard);

                newCard.attach(mainContainerList);
            });
            
        }
    }

    handlePOSTResponse (status: number, url: string, response: string): void {
        if (url.endsWith("devices")){
            // Es el response de un request para crear un nuevo dispositivo
            // En response está el nuevo dispositivo. Se lo agrega a la lista de
            // dispostivos
            let newDevice: Device = JSON.parse(response);
            let newCard: UiComponent = new DeviceCard(newDevice);

            this.listaDispositivos.push(newDevice);
            this.listaComponentes.push(newCard);

            let mainContainerList = document.getElementById("main_container_devices_list");
            newCard.attach(mainContainerList);
        }
    }

    handleDELETEResponse (status: number, response: string): void {
        if (status == 200) {
            // Si se pudo eliminar el device en el backend, se borra la card
            // que lo representa y se lo elimina del array listaComponentes y listaDispositivos
            let resp = JSON.parse(response);
            this.removeDeviceById(resp.id);
            this.removeUiComponentById(resp.id);

            let elem = document.getElementById("card_" + resp.id);
            elem.remove();
        }
    }

    handlePATCHResponse (status: number, response: string): void {
        if (status == 200) {
            // Es el response de la modificación de alguno de los dispositivo
            // En el response viene el device como quedó luego de la modificación
            let modifiedDevice: Device = JSON.parse(response);
            
            let originalDevice = this.getDeviceById(modifiedDevice.id);

            // Se actualizan los valores del device en listaDispositivos
            originalDevice.name = modifiedDevice.name;
            originalDevice.description = modifiedDevice.description;

            // Se vuelve a dibujar la card del dispositivo
            let deviceComponent = this.getUiComponentById(originalDevice.id);
            deviceComponent.changeDevice(originalDevice);
        }
    }

    getDeviceById (id: number): Device {
        let ret: Device = undefined;

        this.listaDispositivos.forEach(device => {
            if (device.id === id)
                ret = device;
        })

        return ret;
    }

    getUiComponentById (id: number): UiComponent {
        let ret: UiComponent = undefined;

        this.listaComponentes.forEach(uiComponent => {
            if (uiComponent.device.id === id)
                ret = uiComponent;
        })

        return ret;
    }

    removeDeviceById (id: number): void {
        for (let i = 0; i < this.listaDispositivos.length; i++) {
            if (this.listaDispositivos[i].id === id) {
                this.listaDispositivos.splice(i, 1);
                break;
            }
        }
    }

    removeUiComponentById (id: number): void {
        for (let i = 0; i < this.listaComponentes.length; i++) {
            if (this.listaComponentes[i].device.id === id) {
                this.listaComponentes.splice(i, 1);
                break;
            }
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