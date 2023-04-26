$(document).ready(function () {
    // Obtener elementos del DOM
    const btn = $("#getDigi");
    const digiName = $("h2");
    const level = $("span");
    const digiPicture = $("img");
    const mainURL = 'https://digimon-api.vercel.app/api/digimon';

    // agregamos event listener al botón de buscar
    btn.on("click", masterControl);

    // funcion para buscar un Digimon por nombre
    function masterControl() {
        const name = $("input").val().toLowerCase();
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
        $.get(url, function (data) {
            // Función para buscar un Digimon en la API
            digiName.text(data[0]["name"]);
            // Mostrar el nivel del Digimon
            level.text(data[0]["level"]);
            // Mostrar la imagen del Digimon
            digiPicture.attr("src", data[0]["img"]);
            // Agregar un atributo alt a la imagen
            digiPicture.attr("alt", `Image of ${name}`);
        })
            .fail(function (err) {
                // si hay un error, buscar el nombre en la lista de Digimon
                lookup(mainURL, name);
                console.log(`error ${err}`);
            });
    }
    // funcion si no hay nada en el campo de entrada y se hace clic en el boton buscar
    function inCaseOfMistakes() {
        digiName.text(`That wasn't a digimon so here's a dog`);
        digiPicture.attr("src", 'https://picsum.photos/id/237/200/300');
        level.text('ultimate, yes, ultimate');
    }

    // funcion si se ingreso un nombre invalido en el input
    function lookup(arr, name) {
        let str = name.split('');
        let rearranged = str[0].toUpperCase() + str.slice(1).join('');
        let bul = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == rearranged) {
                digiName.text(arr[i].name);
                level.text(arr[i].level);
                digiPicture.attr("src", arr[i].img);
                digiPicture.attr("alt", `Image of ${arr[i].name}`);
                bul = false;
            }
        }
        if (bul) {
            digiName.text(`We couldn't find a Digimon named ${name}, try again!`);
            digiPicture.attr("src", 'https://picsum.photos/id/237/200/300');
            level.text('ultimate, yes, ultimate');
        }
    }
    // getDigimonNames();
});
