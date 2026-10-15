const readline = require('readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function pedirEntero(mensaje) {
  while (true) {
    const texto = (await rl.question(mensaje)).trim();
    if (/^-?\d+$/.test(texto)) return parseInt(texto, 10);
    console.log('Valor no válido. Introduce un número entero.');
  }
}

// Número aleatorio entre 1 y 100 (ambos inclusive)
function generarSecreto() {
  return Math.floor(Math.random() * 100) + 1;
}

function darPista(intento, secreto) {
  console.log(secreto < intento ? 'Mi número es menor.' : 'Mi número es mayor.');
}

async function main() {
  console.log('He pensado un número entre 1 y 100. ¡Adivínalo!');
  const secreto = generarSecreto();
  let intentos = 0;
  let acertado = false;

  while (!acertado) {
    const intento = await pedirEntero('Tu número: ');
    intentos++;

    if (intento === secreto) {
      acertado = true;
      console.log(`¡Enhorabuena! Has acertado el número ${secreto} en ${intentos} intento(s).`);
    } else {
      darPista(intento, secreto);
    }
  }

  rl.close();
}

main();
