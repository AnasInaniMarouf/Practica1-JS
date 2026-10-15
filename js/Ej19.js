const readline = require('readline/promises');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const TARIFAS = { m: 25, t: 30, n: 35 }; // €/hora según el turno

// ---------- Funciones reutilizables de entrada ----------
async function pedirTexto(mensaje) {
  while (true) {
    const texto = (await rl.question(mensaje)).trim();
    if (texto !== '') return texto;
    console.log('El campo no puede estar vacío.');
  }
}

async function pedirNumero(mensaje) {
  while (true) {
    const texto = (await rl.question(mensaje)).trim().replace(',', '.');
    const valor = Number(texto);
    if (texto !== '' && !isNaN(valor) && valor >= 0) return valor;
    console.log('Valor no válido. Introduce un número mayor o igual que 0.');
  }
}

async function pedirTurno() {
  while (true) {
    const turno = (await rl.question('Turno - Mañana (m), Tarde (t) o Noche (n): '))
      .trim()
      .toLowerCase();
    if (turno in TARIFAS) return turno;
    console.log('Turno no válido. Usa m, t o n.');
  }
}

async function pedirSiNo(mensaje) {
  while (true) {
    const r = (await rl.question(`${mensaje} (s/n): `)).trim().toLowerCase();
    if (r === 's') return true;
    if (r === 'n') return false;
    console.log("Responde 's' o 'n'.");
  }
}

// ---------- Funciones de cálculo ----------
function calcularBruto(horas, turno) {
  return horas * TARIFAS[turno];
}

// < 600 € -> 8 %  |  600 - 1000 € -> 10 %  |  > 1000 € -> 12 %
function calcularPorcentajeDescuento(bruto) {
  if (bruto < 600) return 8;
  if (bruto <= 1000) return 10;
  return 12;
}

function calcularNeto(bruto) {
  const descuento = calcularPorcentajeDescuento(bruto);
  return bruto - (bruto * descuento) / 100;
}

// ---------- Funciones de salida ----------
function mostrarSalarios(nombre, apellido, bruto, neto) {
  console.log(`\nTrabajador: ${nombre} ${apellido}`);
  console.log(`  Salario bruto: ${bruto.toFixed(2)} €`);
  console.log(`  Salario neto:  ${neto.toFixed(2)} €`);
}

// ---------- Programa principal ----------
async function main() {
  let totalBrutos = 0;
  let continuar = true;

  while (continuar) {
    console.log('\nNuevo trabajador');
    const nombre = await pedirTexto('Nombre: ');
    const apellido = await pedirTexto('Apellido: ');
    const horas = await pedirNumero('Horas trabajadas: ');
    const turno = await pedirTurno();

    const bruto = calcularBruto(horas, turno);
    const neto = calcularNeto(bruto);
    totalBrutos += bruto;
    mostrarSalarios(nombre, apellido, bruto, neto);

    continuar = await pedirSiNo('\n¿Quieres introducir otro trabajador?');
  }

  console.log(`\nImporte total de salarios brutos abonados: ${totalBrutos.toFixed(2)} €`);
  rl.close();
}

main();
