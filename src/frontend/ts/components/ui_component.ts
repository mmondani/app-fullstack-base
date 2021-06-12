class UiComponent {
    public id: number;
    public htmlString: string;
    
    constructor (id:number) {
        this.id = id;
    }

    attach (parent: HTMLElement): void {
    }
}