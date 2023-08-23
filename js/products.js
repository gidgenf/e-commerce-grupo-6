document.addEventListener("DOMContentLoaded", function () {
   const catID = localStorage.getItem("catID"); //se declara la constante catID del local storage catID
   let catID_json = catID + ".json";
   let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;

   fetch(url) // fetch que muestra los productos 
      .then(response => response.json())
      .then(responseData => {
         data = responseData;
         listaOriginal = data.products;
         mostrarTarjetas();
      })
      .catch(error => console.log('Error:', error));
});


function mostrarTarjetas() {  //funcion que muestra las tarjetas de los productos
   let element = document.getElementById('objet-conteiner');
   element.innerHTML = '';  //elemento vacio

   data.products.forEach(x => { //por cada producto agrega una tarjeta al elemento vacio
      element.innerHTML += `
         <a href="product-info.html" class="links-products">
         <div class="cards mouseHover">
              <img src="${x.image}" class="img-card" alt="${x.name}">
              <div class="body-card">
                <h4 class="text-card card-title">${x.name}</h4>
                <p class="text-card description">${x.description}</p>
                <p class="text-card">${x.cost}$</p>
              </div>
         </div>
         </a>`;
   });
}

sortProductsAsc = document.getElementById('sortCostAsc'); //variables de los botones para ordenado ascendente y decendente
sortProductsDesc = document.getElementById('sortCostDesc');

sortProductsAsc.addEventListener('click', function () { //evento click para el boton de ordenado ascendente y muestra las tarjetas
   data.products.sort((a, b) => a.cost - b.cost); 
   mostrarTarjetas();
});

sortProductsDesc.addEventListener('click', function () { //evento click para el boton ordenado decendente y muestra las tarjetas
   data.products.sort((a, b) => b.cost - a.cost); 
   mostrarTarjetas();
});

function maximoMinimo(elemento) {
   let min = parseInt(document.getElementById('rangeFilterCostMin').value); //filtro de precios que compara los precios de los articulos dentro de los rangos, si los cumple los devuelve
   let max = parseInt(document.getElementById('rangeFilterCostMax').value);

   return elemento.cost >= min && elemento.cost <= max;
}

const filtrar = document.getElementById('filtrarCosto') //se declara la constante filtrar del boton filtrarCosto

filtrar.addEventListener('click', function () { //evento para el boton de filtrado que toma la lista original de productos y le aplica el filtro, luego muestra las tarjetas
   data.products = listaOriginal.filter(maximoMinimo); //utiliza la funcion de maximoMinimo como metodo de filtro
   mostrarTarjetas();
   
});

//Limpia los rangos de costo maximo y costo minimo pero como deja los campos vacios los productos desaparecen al ser mostradas las tarjetas
document.getElementById("limpiarRangos").addEventListener("click", function () {
   document.getElementById("rangeFilterCostMin").value = "";
   document.getElementById("rangeFilterCostMax").value = "";

   mostrarTarjetas();
   
});



