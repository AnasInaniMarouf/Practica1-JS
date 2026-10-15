let array = [1, 5, 3, 5, 13, 71, 0]

let aux;
let ordenado = false;

while(!ordenado) {

    ordenado = true;

    for(let i = array.length - 1; i > 0 - 1; i--) {
    
        if(array[i] > array[i - 1]) {
            aux = array[i - 1];
            array[i - 1] = array[i];
            array[i] = aux;

            ordenado = false;
        }
    }
}



console.log(array);
