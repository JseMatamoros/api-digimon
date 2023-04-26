$(document).ready(function () {
    // Obtener elementos del DOM
    const btn = $("#getDigi");
    const digiName = $("h2");
    const level = $("span");
    const digiPicture = $("img");
    const randomDigi = $("#random");
    const mainURL = 'https://digimon-api.vercel.app/api/digimon';
    // btn.on("click", masterControl);
    randomDigi.on("click", getRandoMambo);

    // funcion "si" se hace clic en el boton aleatorio (random)
    function getRandoMambo() {
        const random = Math.floor(Math.random() * 209);
        $.get(mainURL, function (data) {
            digiName.text(data[random]["name"]);
            level.text(data[random]["level"]);
            digiPicture.attr("src", data[random]["img"]);
            digiPicture.attr("alt", `Image of ${data[random]["name"]}`);
        })
            .fail(function (err) {
                console.log(`error ${err}`);
            });
    }
    // obtener el elemento select del DOM
    const select = $('#digimonSelect');
    // agregar un event listener para cuando cambie el valor seleccionado
    select.on('change', function () {
        // obtener el valor seleccionado
        const selectedValue = $(this).val();

        // si se seleccionó la opción por defecto, no hacer nada
        if (selectedValue === '') {
            return;
        }
        // obtener el Digimon correspondiente a la opción seleccionada
        const url = `https://digimon-api.vercel.app/api/digimon/name/${selectedValue}`;
        $.get(url, function (data) {
            // mostrar el nombre, nivel e imagen del Digimon
            digiName.text(data[0]["name"]);
            level.text(data[0]["level"]);
            digiPicture.attr("src", data[0]["img"]);
            digiPicture.attr("alt", `Image of ${selectedValue}`);
        })
            .fail(function (err) {
                console.log(`error ${err}`);
            });
    });
    // función para obtener la lista de nombres de Digimon y agregarlos al menú desplegable
    function getDigimonNames() {
        const url = 'https://digimon-api.vercel.app/api/digimon';
        $.get(url, function (data) {
            // agregar cada nombre de Digimon como una opción en el menú desplegable
            data.forEach(function (digimon) {
                const option = $('<option>').attr('value', digimon.name).text(digimon.name);
                select.append(option);
            });
        })
            .fail(function (err) {
                console.log(`error ${err}`);
            });
    }
    // llamar a la función getDigimonNames al cargar la página
    getDigimonNames();
});



// // Obtener elementos del DOM
// const btn = document.querySelector("#getDigi");
// const digiName = document.querySelector("h2");
// const level = document.querySelector("span");
// const digiPicture = document.querySelector("img");
// const randomDigi = document.querySelector("#random");
// const mainURL = 'https://digimon-api.vercel.app/api/digimon';

// // agregamos event listeners a los botones
// btn.addEventListener("click", masterControl);
// randomDigi.addEventListener("click", getRandoMambo);

// // funcion para buscar un Digimon por nombre
// function masterControl() {
//     const name = document.querySelector("input").value.toLowerCase();
//     // Si el input está vacío, mostrar un mensaje de error
//     if (name == '') {
//         inCaseOfMistakes();
//     } else if (name.search(' ') !== '1') {
//         // si hay un espacio en el nombre, eliminarlo y continuar
//         fixName(name);
//     } else {
//         // buscar el digimon con el nombre proporcionado
//         getFetch(name)
//     }
// }

// // function para corregir un nombre con un espacio en blanco
// function fixName(wrd) {
//     let arr = wrd.split(' ');
//     return getFetch(arr.filter(item => item !== ' ').join(''));
// }

// // function para buscar un digimon en la api
// // con entrada de datos correcta
// function getFetch(name) {
//     const url = `https://digimon-api.vercel.app/api/digimon/name/${name}`;
//     console.log(url)
//     fetch(url)
//         // analizar la respuesta como json
//         .then((res) => res.json()) 
//         .then((data) => {
//             // Función para buscar un Digimon en la API
//             digiName.textContent = data[0]["name"];
//             // Mostrar el nivel del Digimon
//             level.textContent = data[0]["level"];
//             // Mostrar la imagen del Digimon
//             digiPicture.src = data[0]["img"];
//             // Agregar un atributo alt a la imagen
//             digiPicture.alt = `Image of ${name}`;
//         })
//         .catch((err) => {
//             // Si hay un error, buscar el nombre en la lista de Digimon
//             lookup(mainURL, name);
//             console.log(`error ${err}`);
//         });
// }

// // funcion "si" se hace clic en el boton aleatorio (random)
// function getRandoMambo() {
//     const random = Math.floor(Math.random() * 209);
//     fetch(mainURL)
//         // analizar la respuesta como json
//         .then((res) => res.json()) 
//         .then((data) => {
//             digiName.textContent = data[random]["name"];
//             level.textContent = data[random]["level"];
//             digiPicture.src = data[random]["img"];
//             digiPicture.alt = `Image of ${data[random]["name"]}`;
//         })
//         .catch((err) => {
//             console.log(`error ${err}`);
//         });
// }

// // funcion si no hay nada en el campo de entrada y se hace clic en el boton buscar
// function inCaseOfMistakes() {
//     digiName.textContent = `That wasn't a digimon so here's a dog`;
//     digiPicture.src = 'https://picsum.photos/id/237/200/300';
//     level.textContent = 'ultimate, yes, ultimate'
// }

// // funcion si se ingreso un nombre invalido en el input
// function lookup(arr, name) {
//     let str = name.split('');
//     let rearranged = str[0].toUpperCase() + str.slice(1).join('');
//     let bul = true;
//     for (let i = 0; i < arr.length; i++) {
//         if (name !== arr[i][0]) {
//             bul = false;
//         }
//     }
//     return !(bul) ? inCaseOfMistakes() : console.log('it was real');
// }

// // crear una referencia al elemento select del DOM
// const select = document.querySelector("#digimonSelect");
// // realizar una solicitud fetch para obtener todos los Digimon
// fetch(mainURL)
//     .then((res) => res.json())
//     .then((data) => {
//         // recorrer los datos de Digimon y crear una opción para cada uno
//         data.forEach((digimon) => {
//             // crear un elemento option del DOM
//             const option = document.createElement("option");
//             // establecer el valor de la opcion con el nombre del Digimon
//             option.value = digimon.name;
//             // establecer el texto de la opcion con el nombre del Digimon
//             option.textContent = digimon.name;
//             // agregar la opcion al elemento select
//             select.appendChild(option);
//         });
//     })
//     // manejar el error de la solicitud fetch
//     .catch((err) => {
//         console.log(`error ${err}`);
//     });

// // agregar un evento de cambio al elemento select
// select.addEventListener("change", () => {
//     // obtener el nombre del Digimon seleccionado y convertirlo a minusculas
//     const name = select.value.toLowerCase();
//     // realizar una solicitud fetch para obtener la informacion del Digimon seleccionado
//     fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
//         // analizar la respuesta como JSON
//         .then((res) => res.json())
//         .then((data) => {
//             // actualizar los elementos del DOM con la información del Digimon seleccionado
//             digiName.textContent = data[0].name;
//             level.textContent = data[0].level;
//             digiPicture.src = data[0].img;
//             digiPicture.alt = `Image of ${name}`;
//         })
//         .catch((err) => {
//             // Manejar el error de la solicitud fetch
//             console.log(`error ${err}`);
//         });
// });