const mainURL='https://digimon-api.vercel.app/api/digimon';const loadDigimonImages=()=>{$.get(mainURL).done(data=>{const images=data.map(digimon=>digimon.img);$('.responsive').slick({dots:false,infinite:false,speed:300,slidesToShow:11,slidesToScroll:4,responsive:[
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
});images.forEach(image=>{const slide=$(`<div><img src="${image}" style="width: 100%; height: auto;" alt="imagen de un digimon"></div>`);$('.responsive').slick('slickAdd',slide);});}).fail(err=>{console.log(`Error fetching data: ${err}`);});};const showRandomDigimon=()=>{$.get(mainURL).done(data=>{const randomIndex=Math.floor(Math.random()*data.length);const randomDigimon=data[randomIndex];displayDigimonInfo(randomDigimon);}).fail(err=>{console.log(`Error fetching data: ${err}`);});};const getDigimonByName=name=>{const url=`${mainURL}/name/${name}`;return $.get(url);};const displayDigimonInfo=digimon=>{const digiName=$("#digiContainer h2");const level=$("#digiContainer span");const digiPicture=$("#digiContainer img");digiName.text(digimon.name);level.text(digimon.level);digiPicture.attr("src",digimon.img);digiPicture.attr("alt",`Image of ${digimon.name}`);};const loadSelectedDigimon=()=>{const select=$("#digimonSelect");select.on("change",function(){const selectedValue=$(this).val();if(selectedValue===""){return;}getDigimonByName(selectedValue).done(data=>{displayDigimonInfo(data[0]);}).fail(err=>{console.log(`Error fetching data: ${err}`);});});};const loadRandomDigimon=()=>{const randomButton=$("#random");randomButton.on("click",()=>{showRandomDigimon();});};const handleSearchByName=()=>{const searchInput=$("#searchInput");const getDigiButton=$("#getDigi");getDigiButton.on("click",()=>{const digimonName=searchInput.val();if(digimonName===""){showRandomDigimon();return;}getDigimonByName(digimonName).done(data=>{if(data.length===0){const errorMessage="No se encontró ningún Digimon con ese nombre.";alert(errorMessage);}else{displayDigimonInfo(data[0]);}}).fail(err=>{console.log(`Error fetching data: ${err}`);});});searchInput.on("keydown",event=>{if(event.key==="Enter"){getDigiButton.click();}});};const getDigimonNames=()=>{$.get(mainURL).done(data=>{const select=$("#digimonSelect");data.forEach(digimon=>{const option=$("<option>").attr("value",digimon.name).text(digimon.name);select.append(option);});}).fail(err=>{console.log(`Error fetching data: ${err}`);});};loadDigimonImages();getDigimonNames();loadSelectedDigimon();showRandomDigimon();loadRandomDigimon();handleSearchByName();

