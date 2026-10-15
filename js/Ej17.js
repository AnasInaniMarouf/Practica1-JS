const readline = require('readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function pedirEntero(mensaje) {
  while (true) {
    const texto = (await rl.question(mensaje)).trim();
    if (/^-?\d+$/.test(texto)) return parseInt(texto, 10);
    console.log('Valor no válido. Introduce un número entero.');
  }
}

function calcularMenor(a, b) {
  return a < b ? a : b;
}

async function main() {
  const a = await pedirEntero('Primer número entero: ');
  const b = await pedirEntero('Segundo número entero: ');

  const menor = calcularMenor(a, b);
  const mayor = menor === a ? b : a;
  console.log(`El menor es: ${menor}`);

  const entre = [];
  for (let i = menor + 1; i < mayor; i++) {
    entre.push(i);
  }

  if (entre.length > 0) {
    console.log('Números entre ellos: ' + entre.join(', '));
  } else {
    console.log('No hay números entre ellos.');
  }
  console.log(`Cantidad de números entre ellos: ${entre.length}`);

  rl.close();
}

main();
