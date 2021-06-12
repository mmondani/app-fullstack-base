class MyFramework {
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
                    listener.handlePOSTResponse(xhr.status, xhr.responseText);
                else
                    listener.handlePOSTResponse(xhr.status, null);
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
}

interface GETResponseListener {
    handleGETResponse (status: number, response: string): void;
}

interface POSTResponseListener {
    handlePOSTResponse (status: number, response: string): void;
}

interface DELETEResponseListener {
    handleDELETEResponse (status: number, response: string): void;
}