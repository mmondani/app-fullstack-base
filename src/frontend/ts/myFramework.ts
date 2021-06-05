class MyFramework {
    getElementById (): HTMLElement {
        return document.getElementById("boton");
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
}

interface GETResponseListener {
    handleGETResponse (status: number, response: string): void;
}