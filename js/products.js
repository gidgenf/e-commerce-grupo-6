document.addEventListener("DOMContentLoaded", function () {
   const catID = localStorage.getItem("catID");  //se declara la constante catID del local storage catID
   let catID_json = catID + ".json";
   let url = PRODUCTS_URL + catID_json;

   //variables de los botones para ordenado ascendente, decendente y por rel
   sortProductsAsc = document.getElementById('sortCostAsc');
   sortProductsDesc = document.getElementById('sortCostDesc');
   sortByRel = document.getElementById('sortByRel');

   fetch(url)                                    //fetch que muestra los productos 
      .then(response => response.json())
      .then(responseData => {
         data = responseData;
         listaOriginal = data.products;
         mostrarTarjetas();
      })
      .catch(error => console.log('Error:', error));

   function mostrarTarjetas() {                    //funcion que muestra las tarjetas de los productos
      let element = document.getElementById('objet-conteiner');
      element.innerHTML = '';                      //elemento vacio

      data.products.forEach(x => {                 //por cada producto agrega una tarjeta al elemento vacio
         element.innerHTML += `
         <div class="card custom-card mouseHover mx-3 my-3 bgtext" onclick="setProductID(${x.id})">
         <img src="${x.image}" class="img-card card-img-top" alt="${x.name}">
         <div class="card-body">
           <h5 class="card-title text-card text">${x.name}</h5>
           <p class="card-text text-card text">${x.description}</p>
           <p class="text-card text">${x.cost}$</p>
         </div>
       </div>
     `;
      });
   }

   //Orden de relevancia//

   sortByRel.addEventListener('click', function () { //evento click para el boton de ordenado ascendente y muestra las tarjetas
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

   const filtrar = document.getElementById('filterCost'); //se declara el boton de id filterCost como filtrar

   filtrar.addEventListener('click', function () {  //evento click que retorna los valores del rango minimo y maximo
      min = parseInt(document.getElementById('rangeFilterCostMin').value);
      max = parseInt(document.getElementById('rangeFilterCostMax').value);

      if (isNaN(min) || isNaN(max)) { //isNaN nos permite determinar en este caso si los valores numericos de max y min existen
         alert("Por favor, complete los campos")
      } else {
         data.products = listaOriginal.filter(maximoMinimo); //se aplica el filtro a la lista original de productos y se muestran las tarjetas de productos
         mostrarTarjetas();
      }
   });

   //evento para el el elmento de id clearRange que al darle click limpia los campos de costo de maximo y minimo
   document.getElementById("clearRange").addEventListener("click", function () {
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      mostrarTarjetas();
   });

});

function setProductID(id) {
   localStorage.setItem("productID", id);        //setea el ID del producto y nos relocaliza a product-info.html
   window.location.href = "product-info.html";
}