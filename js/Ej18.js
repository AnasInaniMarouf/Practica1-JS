const readline = require('readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function pedirEntero(mensaje) {
  while (true) {
    const texto = (await rl.question(mensaje)).trim();
    if (/^-?\d+$/.test(texto)) return parseInt(texto, 10);
    console.log('Valor no válido. Introduce un número entero.');
  }
}

// Una función por cada opción del menú
function esMultiploDe2(n) {
  return n % 2 === 0;
}

function esMultiploDe3(n) {
  return n % 3 === 0;
}

function esMultiploDe5(n) {
  return n % 5 === 0;
}

function mostrarResultado(n, divisor, resultado) {
  console.log(resultado
    ? `${n} SÍ es múltiplo de ${divisor}.`
    : `${n} NO es múltiplo de ${divisor}.`);
}

function mostrarMenu() {
  console.log('\nMenú');
  console.log('----');
  console.log('1. Calcular si es múltiplo de 2.');
  console.log('2. Calcular si es múltiplo de 3.');
  console.log('3. Calcular si es múltiplo de 5.');
  console.log('0. Salir');
}

async function main() {
  const n = await pedirEntero('Introduce un número: ');
  let opcion;

  do {
    mostrarMenu();
    opcion = (await rl.question('Elige una opción: ')).trim();

    switch (opcion) {
      case '1':
        mostrarResultado(n, 2, esMultiploDe2(n));
        break;
      case '2':
        mostrarResultado(n, 3, esMultiploDe3(n));
        break;
      case '3':
        mostrarResultado(n, 5, esMultiploDe5(n));
        break;
      case '0':
        console.log('Saliendo del menú...');
        break;
      default:
        console.log('Opción no válida.');
    }
  } while (opcion !== '0');

  rl.close();
}

main();
