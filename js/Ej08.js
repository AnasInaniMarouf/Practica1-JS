let resultado = "";

for(let i = 1; i <= 50; i++) {
    for(let j = 0; j < i; j++) {
        resultado += i + " "; 
    }
    console.log(resultado);
    resultado = "";
}