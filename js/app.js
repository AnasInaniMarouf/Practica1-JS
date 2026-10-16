/* =============================================
   Cine Mar - Taquilla
   Lógica de cálculo del pedido
   ============================================= */

// ---------- Datos de negocio (estructuras de datos) ----------

// Tarifas por edad: se recorren en orden y se elige la primera cuya edad máxima no se supera
const TARIFAS = [
  { nombre: "Infantil", edadMaxima: 11, precioBase: 5.0 },
  { nombre: "General", edadMaxima: 64, precioBase: 8.0 },
  { nombre: "Senior", edadMaxima: 120, precioBase: 5.5 }
];

// Suplemento por entrada según el tipo de sala
const SUPLEMENTOS_SALA = {
  normal: 0,
  "3d": 2,
  vip: 4
};

// Descuento (en tanto por ciento) según el día de la sesión
const DESCUENTOS_DIA = {
  lunes: 10,
  martes: 10,
  miercoles: 30,
  jueves: 10,
  viernes: 0,
  sabado: 0,
  domingo: 0
};

const EDAD_MINIMA = 0;
const EDAD_MAXIMA = 120;
const EDAD_MINIMA_VIP = 12;

// ---------- Referencias a los elementos de la página ----------
const inputNombre = document.getElementById("nombre");
const inputEdad = document.getElementById("edad");
const inputEntradas = document.getElementById("numeroEntradas");
const selectSala = document.getElementById("sala");
const selectDia = document.getElementById("dia");
const inputTotal = document.getElementById("total");
const divMensaje = document.getElementById("mensaje");
const divResultado = document.getElementById("resultado");

// ---------- Funciones auxiliares ----------

/**
 * Formatea un importe con dos decimales y el símbolo €.
 * @param {number} importe
 * @returns {string} Ejemplo: "12,50 €"
 */
function formatearEuros(importe) {
  return importe.toFixed(2).replace(".", ",") + " €";
}

/**
 * Comprueba que un texto sea un número entero (sin decimales ni letras).
 * @param {string} texto
 * @returns {boolean}
 */
function esEntero(texto) {
  return /^\d+$/.test(texto);
}

/**
 * Escapa caracteres especiales para insertar texto del usuario en innerHTML.
 * @param {string} texto
 * @returns {string}
 */
function escaparHTML(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Devuelve la tarifa (nombre y precio base) que corresponde a una edad.
 * @param {number} edad
 * @returns {{nombre: string, edadMaxima: number, precioBase: number}}
 */
function obtenerTarifa(edad) {
  return TARIFAS.find(function (tarifa) {
    return edad <= tarifa.edadMaxima;
  });
}

/**
 * Valida los datos del formulario.
 * @param {string} nombre
 * @param {string} edadTexto
 * @param {string} entradasTexto
 * @param {string} sala
 * @param {string} dia
 * @returns {string} Mensaje de error, o cadena vacía si todo es correcto.
 */
function validarDatos(nombre, edadTexto, entradasTexto, sala, dia) {
  if (nombre === "") {
    return "El nombre del cliente es obligatorio.";
  }

  if (!esEntero(edadTexto) || Number(edadTexto) < EDAD_MINIMA || Number(edadTexto) > EDAD_MAXIMA) {
    return "La edad es obligatoria y debe ser un número entero entre " + EDAD_MINIMA + " y " + EDAD_MAXIMA + ".";
  }

  if (!esEntero(entradasTexto) || Number(entradasTexto) < 1) {
    return "El número de entradas debe ser un número entero mayor o igual que 1.";
  }

  if (dia === "") {
    return "Debes seleccionar un día.";
  }

  if (sala === "vip" && Number(edadTexto) < EDAD_MINIMA_VIP) {
    return "En la sala VIP no pueden entrar menores de " + EDAD_MINIMA_VIP + " años.";
  }

  return "";
}

/**
 * Calcula todos los importes del pedido.
 * @returns {object} Datos del cálculo (tarifa, precio por entrada, subtotal, descuento, total...)
 */
function calcularPedido(edad, numeroEntradas, sala, dia) {
  const tarifa = obtenerTarifa(edad);
  const suplemento = SUPLEMENTOS_SALA[sala];
  const precioEntrada = tarifa.precioBase + suplemento;
  const subtotal = precioEntrada * numeroEntradas;
  const porcentajeDescuento = DESCUENTOS_DIA[dia];
  const importeDescuento = subtotal * porcentajeDescuento / 100;

  return {
    tarifa: tarifa,
    suplemento: suplemento,
    precioEntrada: precioEntrada,
    subtotal: subtotal,
    porcentajeDescuento: porcentajeDescuento,
    importeDescuento: importeDescuento,
    total: subtotal - importeDescuento
  };
}

/**
 * Genera el HTML con el detalle del pedido para mostrar en #resultado.
 */
function construirResultado(nombre, edad, numeroEntradas, pedido) {
  return (
    "<h2>Pedido de " + escaparHTML(nombre) + "</h2>" +
    "<table>" +
      "<tr>" +
        "<th>Entradas</th><th>Edad</th><th>Tarifa</th><th>Precio por entrada</th>" +
      "</tr>" +
      "<tr>" +
        "<td>" + numeroEntradas + "</td>" +
        "<td>" + edad + "</td>" +
        "<td>" + pedido.tarifa.nombre + "</td>" +
        "<td>" + formatearEuros(pedido.tarifa.precioBase) + " + " +
          formatearEuros(pedido.suplemento) + " = " +
          formatearEuros(pedido.precioEntrada) + "</td>" +
      "</tr>" +
    "</table>" +
    "<p>Subtotal: " + formatearEuros(pedido.subtotal) + "</p>" +
    "<p>Descuento (" + pedido.porcentajeDescuento + " %): -" +
      formatearEuros(pedido.importeDescuento) + "</p>"
  );
}

// ---------- Manejadores de eventos ----------

/** Lee el formulario, valida y muestra el pedido calculado. */
function manejarCalcular() {
  const nombre = inputNombre.value.trim();
  const edadTexto = inputEdad.value.trim();
  const entradasTexto = inputEntradas.value.trim();
  const sala = selectSala.value;
  const dia = selectDia.value;

  const error = validarDatos(nombre, edadTexto, entradasTexto, sala, dia);

  if (error !== "") {
    // Hay un error: no se calcula nada y se informa al taquillero
    divMensaje.innerText = error;
    divResultado.innerHTML = "";
    inputTotal.value = "";
    return;
  }

  const edad = Number(edadTexto);
  const numeroEntradas = Number(entradasTexto);
  const pedido = calcularPedido(edad, numeroEntradas, sala, dia);

  divResultado.innerHTML = construirResultado(nombre, edad, numeroEntradas, pedido);
  inputTotal.value = formatearEuros(pedido.total);
  divMensaje.innerText =
    "Pedido calculado correctamente: " + numeroEntradas +
    (numeroEntradas === 1 ? " entrada" : " entradas") + " para " + nombre + ".";
}

/** Vacía los campos, el mensaje y el resultado. */
function manejarLimpiar() {
  inputNombre.value = "";
  inputEdad.value = "";
  inputEntradas.value = "";
  selectSala.value = "normal";
  selectDia.value = "";
  inputTotal.value = "";
  divMensaje.innerText = "";
  divResultado.innerHTML = "";
}

// ---------- Asignación de eventos ----------
document.getElementById("btnCalcular").addEventListener("click", manejarCalcular);
document.getElementById("btnLimpiar").addEventListener("click", manejarLimpiar);
