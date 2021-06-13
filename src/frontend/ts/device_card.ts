class DeviceCard {
    public device: Device;
    public htmlString: string;

    constructor (device: Device) {
        this.device = device;
        this.getHtmlString()
    }

    getHtmlString (): void {
        if (this.device.type == 0) {
            this.htmlString = 
            `
            <div class="col s6 m4 l3 xl3" id="card_${this.device.id}">
                <div class="card deep-purple darken-3">
                    
                    <div class="card-content white-text">
                        <div class='card_dots dropdown-trigger' id='dropdown_${this.device.id}' data-target='dropdown_content_${this.device.id}'>
                            <img src="static/images/dots_white.png">
                        </div>

                        <div class="card_icon">
                            <img src="static/images/1.png">
                        </div>
                        
                        <div class="card_title">${this.device.name}</div>
                        <div class="card_description">${this.device.description}</div>

                        <div class="switch card_control">
                            <label>
                                OFF
                                <input type="checkbox" id="switch_${this.device.id}" ${(this.device.state)? "checked": ""}>
                                <span class="lever"></span>
                                ON
                            </label>
                        </div>
                    </div>
                </div>

                <ul id='dropdown_content_${this.device.id}' class='dropdown-content indigo lighten-4'>
                    <li><a id="modify_${this.device.id}">Modificar</a></li>
                    <li><a id="delete_${this.device.id}">Eliminar</a></li>
                </ul>
            </div>
            `
        }
        else if (this.device.type == 1) {
            this.htmlString = 
            `
            <div class="col s6 m4 l3 xl3" id="card_${this.device.id}">
                <div class="card deep-purple darken-3">
                    
                    <div class="card-content white-text">
                        <div class='card_dots dropdown-trigger' id='dropdown_${this.device.id}' data-target='dropdown_content_${this.device.id}'>
                            <img src="static/images/dots_white.png">
                        </div>

                        <div class="card_icon">
                            <img src="static/images/1.png">
                        </div>
                        
                        <div class="card_title">${this.device.name}</div>
                        <div class="card_description">${this.device.description}</div>

                        <div class="range-field card_control">
                            <input type="range" id="slider_${this.device.id}" min="0" max="100" value="${this.device.state * 100}"/>
                        </div>
                    </div>
                </div>

                <ul id='dropdown_content_${this.device.id}' class='dropdown-content indigo lighten-4'>
                    <li><a id="modify_${this.device.id}">Modificar</a></li>
                    <li><a id="delete_${this.device.id}">Eliminar</a></li>
                </ul>
            </div>
            `
        }
    }

    /**
     * Agrega en el parent el código HTML que define a este componente 
     * e inicializa el dropdown que contiene la card
     */
    attach (parent: HTMLElement): void {
        parent.innerHTML += this.htmlString;

        // Se inicializa el dropdown de las cards
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
        let instances = M.Dropdown.init(dropdowns, {});
    }

    /**
     * Vuelve a generar el string HTML que representa una card del dispositivo
     * y reemplaza la card
     */
    changeDevice (newDevice: Device): void {
        this.device = newDevice;
        this.getHtmlString();

        document.getElementById("card_" + this.device.id).outerHTML = this.htmlString;
    }
}