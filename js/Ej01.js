let main = document.getElementById("contenidoPrincipalEjercicio");

let array = [
    ["Pepe", "Sanchez", "2º ESO", [1, 4, 10]],
    ["Pedro", "Sanchez", "2º DAW", [5, 6, 10]],
    ["Paco", "Sanchez", "4º ESO", [6, 7, 1]],
    ["Mr", "Popo", "1º BACH", [8, 5, 3]],
    ["Raul", "Jimenez", "5º ESO", [8, 8, 4]],
]

let parrafo = document.getElementById("parrafo");

for(let i = 0; i < array.length; i++) {

    parrafo.innerText += "Array " + (i + 1) + ": " + array[i] + "\n\n";
}