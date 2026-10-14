let main = document.getElementById("contenidoPrincipal");

for(let i = 1; i <= 20; i++) {
    let linkArchvoJs = document.createElement("a");
    linkArchvoJs.innerText = "Ejercicio " + i;
    if(i < 10) {
        linkArchvoJs.href = "ejs/Ej0" + i + ".html";
    } else {
        linkArchvoJs.href = "ejs/Ej" + i + ".html";
    }
    main.appendChild(linkArchvoJs);
}