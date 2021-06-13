class UiComponent {
    public device: Device;
    public htmlString: string;
    
    constructor (device: Device) {
        this.device = device;
    }

    attach (parent: HTMLElement): void {
    }

    changeDevice (newDevice: Device): void {
        
    }
}