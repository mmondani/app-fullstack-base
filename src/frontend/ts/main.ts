
class Main {
    main () {
        console.log("Hola mundo");

        let listaUsers: Array<User> = new Array<User>();
        listaUsers.push(new User(1, "Usuario 1", "usuario1@mail.com", false));
        listaUsers.push(new User(2, "Usuario 2", "usuario2@mail.com", false));
        listaUsers.push(new User(3, "Usuario 3", "usuario3@mail.com", true));

        this.mostrarUsers(listaUsers);

        let myFramework = new MyFramework();
        let boton = myFramework.getElementById();
        boton.textContent = "Click Me";
        boton.addEventListener("click", this.evento);
    }

    mostrarUsers (users:Array<User>) {
        users.forEach((user: User) => {
            user.printInfo();
        })
    }

    evento (ev: Event) {
        console.log("se hizo click!");
        console.log(this);
    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();
}