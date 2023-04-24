// Obtener elementos del DOM
const btn = document.querySelector("#getDigi");
const digiName = document.querySelector("h2");
const level = document.querySelector("span");
const digiPicture = document.querySelector("img");
const randomDigi = document.querySelector("#random");
const mainURL = 'https://digimon-api.vercel.app/api/digimon';
// agregamos event listeners a los botones
btn.addEventListener("click", masterControl);
randomDigi.addEventListener("click", getRandoMambo);
// Función para buscar un Digimon por nombre
function masterControl() {
    const name = document.querySelector("input").value.toLowerCase();
    // Si el input está vacío, mostrar un mensaje de error
    if (name == '') {
        inCaseOfMistakes();
    } else if (name.search(' ') !== '1') {
        // si hay un espacio en el nombre, eliminarlo y continuar
        fixName(name);
    } else {
        // buscar el digimon con el nombre proporcionado
        getFetch(name)
    }
}
// function para corregir un nombre con un espacio en blanco
function fixName(wrd) {
    let arr = wrd.split(' ');
    return getFetch(arr.filter(item => item !== ' ').join(''));
}
// function para buscar un digimon en la api
// con entrada de datos correcta
function getFetch(name) {
    const url = `https://digimon-api.vercel.app/api/digimon/name/${name}`;
    console.log(url)
    fetch(url)
        .then((res) => res.json()) // analizar la respuesta como json
        .then((data) => {
            // Función para buscar un Digimon en la API
            digiName.textContent = data[0]["name"];
            // Mostrar el nivel del Digimon
            level.textContent = data[0]["level"];
            // Mostrar la imagen del Digimon
            digiPicture.src = data[0]["img"];
            // Agregar un atributo alt a la imagen
            digiPicture.alt = `Image of ${name}`;
        })
        .catch((err) => {
            // Si hay un error, buscar el nombre en la lista de Digimon
            lookup(mainURL, name);
            console.log(`error ${err}`);
        });
}
// si se hace clic en el boton aleatorio
function getRandoMambo() {
    const random = Math.floor(Math.random() * 209);
    fetch(mainURL)
        .then((res) => res.json()) // analizar la respuesta como json
        .then((data) => {
            digiName.textContent = data[random]["name"];
            level.textContent = data[random]["level"];
            digiPicture.src = data[random]["img"];
            digiPicture.alt = `Image of ${data[random]["name"]}`;
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}
// si no hay nada en el campo de entrada y se hace clic en el boton buscar
function inCaseOfMistakes() {
    digiName.textContent = `That wasn't a digimon so here's a dog`;
    digiPicture.src = 'https://picsum.photos/id/237/200/300';
    level.textContent = 'ultimate, yes, ultimate'
}
// si se ingreso un nombre invalido en el input
function lookup(arr, name) {
    let str = name.split('');
    let rearranged = str[0].toUpperCase() + str.slice(1).join('');
    let bul = true;
    for (let i = 0; i < arr.length; i++) {
        if (name !== arr[i][0]) {
            bul = false;
        }
    }
    return !(bul) ? inCaseOfMistakes() : console.log('it was real');
}
// Crear una referencia al elemento select del DOM
const select = document.querySelector("#digimonSelect");
// Realizar una solicitud fetch para obtener todos los Digimon
fetch(mainURL)
    .then((res) => res.json())
    .then((data) => {
        // Recorrer los datos de Digimon y crear una opción para cada uno
        data.forEach((digimon) => {
            // Crear un elemento option del DOM
            const option = document.createElement("option");
            // Establecer el valor de la opción con el nombre del Digimon
            option.value = digimon.name;
            // Establecer el texto de la opción con el nombre del Digimon
            option.textContent = digimon.name;
            // Agregar la opción al elemento select
            select.appendChild(option);
        });
    })
    // Manejar el error de la solicitud fetch
    .catch((err) => {
        console.log(`error ${err}`);
    });
// Agregar un evento de cambio al elemento select
select.addEventListener("change", () => {
    // Obtener el nombre del Digimon seleccionado y convertirlo a minúsculas
    const name = select.value.toLowerCase();
    // Realizar una solicitud fetch para obtener la información del Digimon seleccionado
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        // Analizar la respuesta como JSON
        .then((res) => res.json())
        .then((data) => {
            // Actualizar los elementos del DOM con la información del Digimon seleccionado
            digiName.textContent = data[0].name;
            level.textContent = data[0].level;
            digiPicture.src = data[0].img;
            digiPicture.alt = `Image of ${name}`;
        })
        .catch((err) => {
            // Manejar el error de la solicitud fetch
            console.log(`error ${err}`);
        });
});

