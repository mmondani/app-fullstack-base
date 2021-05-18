class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _isLogged: boolean;

    constructor (id: number, name: string, email: string, isLogged: boolean) {
        this._id = id;
        this. _name = name;
        this._email = email;
        this._isLogged = isLogged;
    }

    get id () : number {
        return this._id;
    }

    set id (id: number) {
        this._id = id;
    }

    get name () : string {
        return this._name;
    }

    set name (name: string) {
        this._name = name;
    }

    get email () : string {
        return this._email;
    }

    set email (email: string) {
        this._email = email;
    }

    get isLogged () : boolean {
        return this._isLogged;
    }

    set isLogged (isLogged: boolean) {
        this._isLogged = isLogged;
    }

    printInfo (): void {
        console.log(this.id + " - " + this.name + " - " + this.email);
    }
}