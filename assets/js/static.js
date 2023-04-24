// const mainURL = 'https://digimon-api.vercel.app/api/digimon';
// aqui estamos usandojs puro
// aqui espera a que el contenido del DOM se haya cargado antes de ejecutar el codigo
document.addEventListener("DOMContentLoaded", function() {
  // realiza una solicitud a la API de digimon y obtiene los datos como objeto json
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then(response => response.json())
      .then(data => {
        // selecciona aleatoriamente un objeto de digimon de los datos recibidos
        const randomIndex = Math.floor(Math.random() * data.length);
        const digimon = data[randomIndex];
        // muestra el nombre, imagen y nivel del digimon seleccionado en el html
        displayDigimon(digimon);
      });
  });
  // funcion para mostrar el nombre, imagen y nivel del digimon en el html
  function displayDigimon(digimon) {
    // actualiza el titulo h2 con el nombre del digimon
    document.querySelector("#digiContainer h2").textContent = digimon.name;
    // actualiza la imagen con el URL de la imagen del digimon
    document.querySelector("#digiContainer img").src = digimon.img;
    // actualiza el nivel con el nivel del digimon
    document.querySelector("#digiContainer span").textContent = digimon.level;
  }
  