declare var M;


class Main  implements EventListenerObject, GETResponseListener {
    myFramework: MyFramework;
    clicks: number = 0;
    listaDispositivos: Array<Device> = [];
    listaComponentes: Array<UiComponent> = [];

    main () {
        this.myFramework = new MyFramework();

        this.myFramework.requestGET("/devices", this);
    }


    handleEvent (evt: Event): void {
        /*
        let elem = <HTMLInputElement>this.myFramework.getElementByEvent(evt);

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

    handleGETResponse(status: number, response: string): void {
        if (status == 200) {
            let mainContainerList = document.getElementById("main_container_devices_list");

            this.listaDispositivos = JSON.parse(response);
            this.listaDispositivos.forEach(dispositivo => {  
                let newCard = new DeviceCard(dispositivo);

                this.listaComponentes.push(newCard);

                newCard.attach(mainContainerList);
            });

            /*
            this.listaDispositivos.forEach(dispositivo => {                
                let sw = this.myFramework.getElementById("switch_" + dispositivo.id);
                sw.addEventListener("click", this);
            });
            */
            
        }
    }

    handlePOSTResponse (status: number, response: string): void {

    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();

/*
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
*/

    /*
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    var modal = <any>document.getElementById("modal_new_device");
    var instance = M.Modal.getInstance(modal)
    instance.open();
    */
}