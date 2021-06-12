declare var M;


class Main  implements EventListenerObject, GETResponseListener {
    myFramework: MyFramework;
    clicks: number = 0;
    listaDispositivos: Array<Device>;

    main () {
        console.log("Hola mundo");

        this.myFramework = new MyFramework();


        this.myFramework.requestGET("/devices", this);
    }


    handleEvent (evt: Event): void {
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
    }

    handleGETResponse(status: number, response: string): void {
        if (status == 200) {
            /*
            this.listaDispositivos = JSON.parse(response);
            this.listaDispositivos.forEach(dispositivo => {  
                            
                let listaDispHtml = this.myFramework.getElementById("listaDispositivos");
                listaDispHtml.innerHTML +=
                        `<li class="collection-item avatar">
                            <i class="material-icons circle">folder</i>
                            <span class="title">${dispositivo.name}</span>
                            <p>${dispositivo.description}</p>
                            <div class="secondary-content">
                                <div class="switch">
                                    <label>
                                        <input id="switch_${dispositivo.id}" type="checkbox" ${(dispositivo.state)? "checked": ""}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </li>`;
            });

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


    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});


    /*
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    var modal = <any>document.getElementById("modal_new_device");
    var instance = M.Modal.getInstance(modal)
    instance.open();
    */
}