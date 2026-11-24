
const carga = document.getElementById("carga");
const ventilador = document.getElementById("ventilador");
const refrigeracion = document.getElementById("refrigeracion");
const agua = document.getElementById("agua");

const procesador = document.getElementById("procesador");
const oceano = document.getElementById("oceano");

const barraCPU = document.getElementById("barraCPU");
const barraOxigeno = document.getElementById("barraOxigeno");

const comprobar = document.getElementById("comprobar");
const contaminar = document.getElementById("contaminar");
const reiniciar = document.getElementById("reiniciar");


function actualizarProcesador() {

    let cargaActual = Number(carga.value);
    let ventilacionActual = Number(ventilador.value);
    let tipoRefrigeracion = refrigeracion.value;

    document.getElementById("valorCarga").innerHTML =
        cargaActual + "%";

    document.getElementById("valorVentilador").innerHTML =
        ventilacionActual + "%";

    let temperatura = 35 + cargaActual * 0.7 - ventilacionActual * 0.3;

    if (tipoRefrigeracion == "liquida") {
        temperatura = temperatura - 10;
    }

    temperatura = Math.round(temperatura);

    document.getElementById("temperaturaCPU").innerHTML =
        temperatura + " °C";

    let porcentaje = temperatura;

    if (porcentaje > 100) {
        porcentaje = 100;
    }

    if (porcentaje < 0) {
        porcentaje = 0;
    }

    barraCPU.style.width = porcentaje + "%";

    if (temperatura < 50) {

        procesador.style.backgroundColor = "#24a36a";
        barraCPU.style.backgroundColor = "#24a36a";

        document.getElementById("estadoCPU").innerHTML =
            "Temperatura baja: el procesador está refrigerado.";
    }
    else if (temperatura <= 75) {

        procesador.style.backgroundColor = "#e6a23c";
        barraCPU.style.backgroundColor = "#e6a23c";

        document.getElementById("estadoCPU").innerHTML =
            "Temperatura moderada: el procesador está trabajando.";
    }
    else {

        procesador.style.backgroundColor = "#d64545";
        barraCPU.style.backgroundColor = "#d64545";

        document.getElementById("estadoCPU").innerHTML =
            "Temperatura elevada: aumentá la refrigeración.";
    }

    if (tipoRefrigeracion == "liquida") {

        document.getElementById("explicacionCPU").innerHTML =
            "La refrigeración líquida utiliza un fluido para absorber " +
            "y transportar el calor del procesador. Luego, un radiador " +
            "transfiere ese calor al aire mediante convección.";
    }
    else {

        document.getElementById("explicacionCPU").innerHTML =
            "El calor pasa del procesador al disipador por conducción. " +
            "Después, el ventilador favorece la transferencia de calor " +
            "al aire mediante convección forzada.";
    }

    document.getElementById("resultadoDesafio").innerHTML = "";
}


function comprobarDesafio() {

    let cargaActual = Number(carga.value);

    let temperatura = Number(
        document.getElementById("temperaturaCPU").innerHTML.replace(" °C", "")
    );

    if (cargaActual >= 90 && temperatura <= 75) {

        document.getElementById("resultadoDesafio").innerHTML =
            "¡Muy bien! Pudiste refrigerar el procesador.";
    }
    else {

        document.getElementById("resultadoDesafio").innerHTML =
            "Todavía no lo lograste. Modificá la carga y la refrigeración.";
    }
}


function actualizarOceano() {

    let temperatura = Number(agua.value);

    document.getElementById("temperaturaAgua").innerHTML =
        temperatura + " °C";

    // Aproximación educativa para agua marina
    let oxigeno = 10.3 - temperatura * 0.135;

    oxigeno = Math.round(oxigeno * 10) / 10;

    document.getElementById("oxigeno").innerHTML =
        "Oxígeno: " + oxigeno + " mg/L";

    let porcentaje = oxigeno / 10.3 * 100;

    barraOxigeno.style.width = porcentaje + "%";

    if (temperatura < 15) {

        oceano.style.backgroundColor = "#168bc4";
        barraOxigeno.style.backgroundColor = "#168bc4";

        document.getElementById("peces").innerHTML = "🐟 🐟 🐟";

        document.getElementById("estadoOceano").innerHTML =
            "Agua fría: mayor solubilidad del oxígeno.";
    }
    else if (temperatura < 28) {

        oceano.style.backgroundColor = "#28a99d";
        barraOxigeno.style.backgroundColor = "#28a99d";

        document.getElementById("peces").innerHTML = "🐟 🐟";

        document.getElementById("estadoOceano").innerHTML =
            "Agua templada: disminuye la solubilidad del oxígeno.";
    }
    else {

        oceano.style.backgroundColor = "#e67e22";
        barraOxigeno.style.backgroundColor = "#e67e22";

        document.getElementById("peces").innerHTML = "🐟";

        document.getElementById("estadoOceano").innerHTML =
            "Agua caliente: menor solubilidad del oxígeno.";
    }

    document.getElementById("explicacionAgua").innerHTML =
        "A medida que aumenta la temperatura, disminuye la cantidad " +
        "máxima de oxígeno que puede disolverse en el agua. " +
        "Esto puede afectar a los organismos marinos, especialmente " +
        "si también aumenta su demanda de oxígeno.";
}


function simularContaminacion() {

    let temperatura = Number(agua.value);

    temperatura = temperatura + 10;

    if (temperatura > 40) {
        temperatura = 40;
    }

    agua.value = temperatura;

    actualizarOceano();
}


function reiniciarOceano() {

    agua.value = 20;

    actualizarOceano();
}


carga.addEventListener("input", actualizarProcesador);

ventilador.addEventListener("input", actualizarProcesador);

refrigeracion.addEventListener("change", actualizarProcesador);

agua.addEventListener("input", actualizarOceano);

comprobar.addEventListener("click", comprobarDesafio);

contaminar.addEventListener("click", simularContaminacion);

reiniciar.addEventListener("click", reiniciarOceano);


actualizarProcesador();
actualizarOceano();
