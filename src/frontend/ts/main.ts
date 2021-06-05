interface EventListenerObject {
    handleEvent (evt: Event): void;
}


class Main  implements EventListenerObject, GETResponseListener {
    myFramework: MyFramework;
    clicks: number = 0;

    main () {
        console.log("Hola mundo");

        let listaUsers: Array<User> = new Array<User>();
        listaUsers.push(new User(1, "Usuario 1", "usuario1@mail.com", false));
        listaUsers.push(new User(2, "Usuario 2", "usuario2@mail.com", false));
        listaUsers.push(new User(3, "Usuario 3", "usuario3@mail.com", true));

        this.mostrarUsers(listaUsers);

        this.myFramework = new MyFramework();

        let boton = this.myFramework.getElementById();
        boton.addEventListener("click", this);

        this.myFramework.requestGET("/devices", this);
    }

    mostrarUsers (users:Array<User>) {
        users.forEach((user: User) => {
            user.printInfo();
        })
    }


    handleEvent (evt: Event): void {
        let boton = this.myFramework.getElementByEvent(evt);
        boton.textContent ="clickeado";

        this.clicks ++;
        console.log(`clicks: ${this.clicks}`);

        console.log(this);
    }

    handleGETResponse(status: number, response: string): void {
        if (status == 200)
            console.log(JSON.parse(response));
    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();
}