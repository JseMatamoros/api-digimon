// Para el carousel en eltop de la pagina hemos utilizado una biblioteca llamada slick.js
//  esta biblioteca nos permite manilpular carousels de forma dinamica basandose en jquery
// hacer una peticion a la API de Digimon
$.get("https://digimon-api.vercel.app/api/digimon", function (data) {
  // obtener las imagenes de los Digimon
  var images = data.map(function (digimon) {
    return digimon.img;
  });
  // mostrar las imagenes en un carrusel usando Slick.js
  $('.responsive').slick({
    dots: false, // quita los botones debajo de las imagenes
    infinite: false,
    speed: 300,
    slidesToShow: 11,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  });
  // agregar las imagenes al carrusel
  // images.forEach(function(image){...});
  images.forEach(function (image) {
    var slide = $("<div><img src='" + image + "' style='width: 100%; height: auto;' alt='imagen de un digimon'></div>");
    $('.responsive').slick('slickAdd', slide);
  });

});
