let resultado = "";
let numero;

for(let i = 1; i <= 100; i++) {
    numero = i.toString();
    if(numero.charAt(numero.length - 1) == "7" || i % 7 == 0) resultado += "PUM\n";
    else resultado += i + ", ";
}

console.log(resultado);
