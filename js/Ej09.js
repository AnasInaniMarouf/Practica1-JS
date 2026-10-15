let resultado = "";

for(let i = 1; i <= 50; i++) {
    for(let j = 1; j <= i; j++) {
        resultado += j + " "; 
    }
    console.log(resultado);
    resultado = "";
}