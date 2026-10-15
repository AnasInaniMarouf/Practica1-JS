let euros = 56;

const eurosADolar = 1.12;
const eurosAYen = 177.04;

if((typeof euros) != "number") {
    console.log("Valor no valido");

} else {

    console.log(euros * eurosADolar);
    console.log(euros * eurosAYen);
}