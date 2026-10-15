let resultado = "";

for(let i = 1; i <= 300; i++) {
    if(i % 4 == 0) resultado += "m4->";
    if(i % 9 == 0) resultado += "m9->";
    resultado += i + " ";
    if(i % 10 == 0) resultado += "\n";
}

console.log(resultado);
