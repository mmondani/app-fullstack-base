class DeviceCard extends UiComponent {

    constructor (device: Device) {
        super(device);

        if (device.type == 0) {
            this.htmlString = 
            `
            <div class="col s6 m4 l3 xl3" id="card_${device.id}">
                <div class="card deep-purple darken-3">
                    
                    <div class="card-content white-text">
                        <div class='card_dots dropdown-trigger' id='dropdown_${device.id}' data-target='dropdown_content_${device.id}'>
                            <img src="static/images/dots_white.png">
                        </div>

                        <div class="card_icon">
                            <img src="static/images/1.png">
                        </div>
                        
                        <div class="card_title">${device.name}</div>
                        <div class="card_description">${device.description}</div>

                        <div class="switch card_control">
                            <label>
                                OFF
                                <input type="checkbox" id="switch_${device.id}" ${(device.state)? "checked": ""}>
                                <span class="lever"></span>
                                ON
                            </label>
                        </div>
                    </div>
                </div>

                <ul id='dropdown_content_${device.id}' class='dropdown-content indigo lighten-4'>
                    <li><a id="modify_${device.id}">Modificar</a></li>
                    <li><a id="delete_${device.id}">Eliminar</a></li>
                </ul>
            </div>
            `
        }
        else if (device.type == 1) {
            this.htmlString = 
            `
            <div class="col s6 m4 l3 xl3" id="card_${device.id}">
                <div class="card deep-purple darken-3">
                    
                    <div class="card-content white-text">
                        <div class='card_dots dropdown-trigger' id='dropdown_${device.id}' data-target='dropdown_content_${device.id}'>
                            <img src="static/images/dots_white.png">
                        </div>

                        <div class="card_icon">
                            <img src="static/images/1.png">
                        </div>
                        
                        <div class="card_title">${device.name}</div>
                        <div class="card_description">${device.description}</div>

                        <div class="range-field card_control">
                            <input type="range" id="slider_${device.id}" min="0" max="100" value="${device.state * 100}"/>
                        </div>
                    </div>
                </div>

                <ul id='dropdown_content_${device.id}' class='dropdown-content indigo lighten-4'>
                    <li><a id="modify_${device.id}">Modificar</a></li>
                    <li><a id="delete_${device.id}">Eliminar</a></li>
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
}