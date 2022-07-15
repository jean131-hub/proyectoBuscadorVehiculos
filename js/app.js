// Variables
const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
//Selects HTML
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Eventos
cargarEventListeners();

function cargarEventListeners() {

    document.addEventListener('DOMContentLoaded', () => {

        // Carga los autos en el HTML
        cargarDatos(autos); //autos es un array de Objetos db.js

        // Llena el select de años
        llenarSelectYears();

    });

    marca.addEventListener('change', (e) => {

        datosBusqueda.marca = e.target.value;
        filtrarAuto();

    });

    year.addEventListener('change', (e) => {

        datosBusqueda.year = e.target.value;
        filtrarAuto();

    });

    minimo.addEventListener('change', (e) => {

        datosBusqueda.minimo = e.target.value;
        filtrarAuto();

    });

    maximo.addEventListener('change', (e) => {

        datosBusqueda.maximo = e.target.value;
        filtrarAuto();

    });

    puertas.addEventListener('change', (e) => {

        datosBusqueda.puertas = e.target.value;
        filtrarAuto();
    });

    transmision.addEventListener('change', (e) => {

        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    });

    color.addEventListener('change', (e) => {

        datosBusqueda.color = e.target.value;
        filtrarAuto();
    });

};

//Objeto Busqueda vacio
const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    color: '',
    transmision: ''
};


// Funciones
function cargarDatos(autos) {

    limpiarHTML();

    if (autos.length) {

        autos.forEach((auto) => {
            const { marca, modelo, year, precio, puertas, color, transmision } = auto;

            const parrafo = document.createElement('p');
            parrafo.textContent = `
            ${marca}, ${modelo}, ${year}, $${precio}, ${puertas} puertas, ${color}, 
            transmisión ${transmision}`;

            resultado.appendChild(parrafo);
        });

    } else{

        const parrafo = document.createElement('div');
        parrafo.textContent = 'No se encontraron resultados';
        parrafo.classList.add('alerta', 'error');
        resultado.appendChild(parrafo);

    };
};

function llenarSelectYears(e) {
    // Crear años
    const max = new Date().getFullYear();
    const min = max - 10;

    for (let i = max; i > min; i--) {
        const option = document.createElement('option');

        option.textContent = i;
        option.value = i;

        year.appendChild(option);
    };
};

// Filtros
function filtrarAuto() {

    const resultado = autos.filter(filtrarPorMarca).filter(filtrarPorYear).filter(filtrarPorMinimo).filter(
        filtrarPorMaximo).filter(filtrarPorPuertas).filter(filtrarPorTransmision).filter(filtrarPorColor);

    cargarDatos(resultado);
};

function filtrarPorMarca(auto) {

    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    };
    return auto;
};

function filtrarPorYear(auto) {

    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    };
    return auto;
};

function filtrarPorMinimo(auto) {

    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    };
    return auto;
};

function filtrarPorMaximo(auto) {

    if (datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    };
    return auto;
};

function filtrarPorPuertas(auto) {

    if (datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas);
    };
    return auto;
};

function filtrarPorTransmision(auto) {

    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    };
    return auto;
};

function filtrarPorColor(auto) {

    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    };
    return auto;

};

//
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    };
};