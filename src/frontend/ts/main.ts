
class Main {
    main () {
        console.log("Hola mundo");

        let listaUsers: Array<User> = new Array<User>();
        listaUsers.push(new User(1, "Usuario 1", "usuario1@mail.com", false));
        listaUsers.push(new User(2, "Usuario 2", "usuario2@mail.com", false));
        listaUsers.push(new User(3, "Usuario 3", "usuario3@mail.com", true));

        listaUsers.forEach((user: User) => {
            user.printInfo();
        })

        let myFramework = new MyFramework();
        let boton = myFramework.getElementById();
        boton.textContent = "Click Me";
    }
}

window.onload = function () {
    let main : Main = new Main();

    main.main();
}