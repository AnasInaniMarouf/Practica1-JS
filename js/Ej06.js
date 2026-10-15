let num1 = 10;
let num2 = 5;

if(num2 == 0 || typeof num1 != "number" || typeof num2 != "number") {
    console.log("Valores no validos");
    
} else {
    console.log("Suma: " + (num1 + num2));
    console.log("Resta: " + (num1 - num2));
    console.log("Multiplicacion: " + num1 * num2);
    console.log("Division: " + num1 / num2);
}