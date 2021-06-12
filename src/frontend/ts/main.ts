declare var M;


class Main  implements EventListenerObject, GETResponseListener {
    myFramework: MyFramework;
    clicks: number = 0;
    listaDispositivos: Array<Device> = [];
    listaComponentes: Array<UiComponent> = [];

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

            if (evt.type === "click") {
                if (action === "modify") {
                    console.log ("modify device id = " + deviceId);
                }
                else if (action === "delete") {
                    console.log ("delete device id = " + deviceId);
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
            /*
            if (elem.id.startsWith("switch")) {
                let idDispo: number = parseInt(elem.id.split("_")[1]);

                this.listaDispositivos.forEach(disp => {
                    if (disp.id == idDispo) {
                        disp.state = elem.checked;

                        //let data = {"id": disp.id, "status": disp.state};
                        //this.myFramework.requestPOST("/devices", this, data);

                        if (disp.state)
                            alert("Se encendió el dispositivo " + disp.name);
                        else
                            alert("Se apagó el dispositivo " + disp.name);
                    }
                })
            }
            */
        }
        else {
            if (evt.type === "click") {
                if (elem.id === "newDevice") {
                    // Se muestra el modal para cargar un nuevo dispositivo
                    var modal = <any>document.getElementById("modal_new_device");
                    var instance = M.Modal.getInstance(modal)
                    instance.open();
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

    handlePOSTResponse (status: number, response: string): void {

    }

    getDeviceById (id: number): Device {
        let ret = undefined;

        this.listaDispositivos.forEach(device => {
            if (device.id === id)
                ret = device;
        })

        return ret;
    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();

    
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
}