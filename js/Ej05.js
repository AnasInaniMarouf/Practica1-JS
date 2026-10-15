let num1 = -90;
let num2 = 202;

if(num1 <= -100 || num2 > 5000) {
    console.log("Numeros no validos");

} else {
    for (let i = num1; i <= num2; i++) {
        if(i % 2 == 0) console.log(i);
    }
}