class MyFramework {
    getElementById (): HTMLElement {
        return document.getElementById("boton");
    }

    getElementByEvent (ev: Event): HTMLElement{
        return <HTMLElement>ev.target;
    }
}