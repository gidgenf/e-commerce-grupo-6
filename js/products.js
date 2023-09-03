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

sortProductsAsc = document.getElementById('sortCostAsc'); //variables de los botones para ordenado ascendente, decendente y relevancia
sortProductsDesc = document.getElementById('sortCostDesc');
sortByRel = document.getElementById('sortByRel');


sortByRel.addEventListener('click', function () { //evento click para el boton de ordenado por relevancia y muestra las tarjetas
   data.products.sort((a, b) => b.soldCount - a.soldCount);
   mostrarTarjetas();
});

sortProductsAsc.addEventListener('click', function () { //evento click para el boton de ordenado ascendente y muestra las tarjetas
   data.products.sort((a, b) => a.cost - b.cost);
   mostrarTarjetas();
});

sortProductsDesc.addEventListener('click', function () { //evento click para el boton ordenado decendente y muestra las tarjetas
   data.products.sort((a, b) => b.cost - a.cost);
   mostrarTarjetas();
});

function maximoMinimo(elemento) { //funcion que se va a usar para aplicar el rango de filtro de precios
   return elemento.cost >= min && elemento.cost <= max;
}

const filtrar = document.getElementById('filtrarCosto'); //viable para el boton de filtro

filtrar.addEventListener('click', function () {  //evento click para el boton de filtro
   min = parseInt(document.getElementById('rangeFilterCostMin').value); //variables de campos de costo maximo y minimo
   max = parseInt(document.getElementById('rangeFilterCostMax').value);

   if (isNaN(min) || isNaN(max)) { //isNaN nos permite determinar en este caso si los valores numericos de max y min existen
      alert("Por favor, complete los campos")
   } else {
      data.products = listaOriginal.filter(maximoMinimo); //se aplica el filtro a la lista original de productos y se muestran las tarjetas de productos
      mostrarTarjetas();
   }
});

//evento para el el elmento de id limpiarRangos que al darle click limpia los campos de costo de maximo y minimo
document.getElementById("limpiarRangos").addEventListener("click", function () {
   document.getElementById("rangeFilterCostMin").value = "";
   document.getElementById("rangeFilterCostMax").value = "";

   mostrarTarjetas();
});



