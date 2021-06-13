class MyFramework {
    devicesList: Array<Device> = [];
    deivceCardsList: Array<DeviceCard> = [];


    getElementById (id: string): HTMLElement {
        return document.getElementById(id);
    }

    getElementByEvent (ev: Event): HTMLElement{
        return <HTMLElement>ev.target;
    }

    requestGET (url: string, listener: GETResponseListener): void {
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)
                    listener.handleGETResponse(xhr.status, xhr.responseText);
                else
                    listener.handleGETResponse(xhr.status, null);
            } 
        }

        xhr.open("GET", url, true);
        xhr.send(null);
    }

    requestPOST (url: string, listener: POSTResponseListener, data: any): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)
                    listener.handlePOSTResponse(xhr.status, xhr.responseURL, xhr.responseText);
                else
                    listener.handlePOSTResponse(xhr.status, xhr.responseURL, null);
            } 
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    requestDELETE (url: string, listener: DELETEResponseListener, data: any): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)
                    listener.handleDELETEResponse(xhr.status, xhr.responseText);
                else
                    listener.handleDELETEResponse(xhr.status, null);
            } 
        }

        xhr.open("DELETE", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    requestPATCH (url: string, listener: PATCHResponseListener, data: any): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200)
                    listener.handlePATCHResponse(xhr.status, xhr.responseText);
                else
                    listener.handlePATCHResponse(xhr.status, null);
            } 
        }

        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }


    getDeviceById (id: number): Device {
        let ret: Device = undefined;

        this.devicesList.forEach(device => {
            if (device.id === id)
                ret = device;
        })

        return ret;
    }

    getDeviceCardById (id: number): DeviceCard {
        let ret: DeviceCard = undefined;

        this.deivceCardsList.forEach(uiComponent => {
            if (uiComponent.device.id === id)
                ret = uiComponent;
        })

        return ret;
    }

    removeDeviceById (id: number): void {
        for (let i = 0; i < this.devicesList.length; i++) {
            if (this.devicesList[i].id === id) {
                this.devicesList.splice(i, 1);
                break;
            }
        }
    }

    removeUiComponentById (id: number): void {
        for (let i = 0; i < this.deivceCardsList.length; i++) {
            if (this.deivceCardsList[i].device.id === id) {
                this.deivceCardsList.splice(i, 1);
                break;
            }
        }
    }
}

interface GETResponseListener {
    handleGETResponse (status: number, response: string): void;
}

interface POSTResponseListener {
    handlePOSTResponse (status: number, url: string, response: string): void;
}

interface DELETEResponseListener {
    handleDELETEResponse (status: number, response: string): void;
}

interface PATCHResponseListener {
    handlePATCHResponse (status: number, response: string): void;
}