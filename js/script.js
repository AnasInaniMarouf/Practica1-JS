let main = document.getElementById("contenidoPrincipal");

for(let i = 1; i <= 20; i++) {
    let boton = document.createElement("input");
    boton.type = "button";
    boton.value = "Ejercicio " + i;
    main.appendChild(boton)

}