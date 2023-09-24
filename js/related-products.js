document.addEventListener("DOMContentLoaded", function () {
    const catID = localStorage.getItem("catID");  //se declara la constante catID del local storage catID
    const idProduct = localStorage.getItem('productID');
    let catID_json = catID + ".json";
    let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;
 console.log(idProduct)
 console.log()
    fetch(url) // fetch que muestra los productos 
    .then(response => response.json())
    .then(responseData => {
       data = responseData;
       let productosRelacionados = data.products.filter(x => x.id !== idProduct);
       mostrarTarjetas(productosRelacionados);
    })
    .catch(error => console.log('Error:', error));
    function setProductID(id) {
        localStorage.setItem("productID", id);        //setea el ID del producto y nos relocaliza a product-info.html
        window.location.href = "product-info.html";
     }
 
 function mostrarTarjetas(productosRelacionados) { // función que muestra las tarjetas de los productos
     let element = document.getElementById('relatedProducts');
     element.innerHTML = ''; // elemento vacío
 
     // Agregar las tarjetas de los productos relacionados
     productosRelacionados.forEach(x => {
         element.innerHTML += `
             <div class="cards slide mouseHover"style="width: 22rem;" onclick="setProductID(${x.id})">
                 <img src="${x.image}" class="img-card" alt="${x.name}">
                 <div class="body-card">
                     <h4 class="text-card card-title">${x.name}</h4>
                     <p class="text-card">${x.cost}$</p>
                 </div>
             </div>
         `;
     });
    }
    const slider = document.querySelector("#relatedProducts");
    const prevButton = document.getElementById("move-left");
    const nextButton = document.getElementById("move-right");
    
    let currentIndex = 0;

    function slideTo(index) {
        if (index < 0) {
            index = 0;
        } else if (index >= slider.children.length) {
            index = slider.children.length - 1;
        }

        currentIndex = index;
        const translateX = -currentIndex * 100;
        slider.style.transform = `translateX(${translateX}%)`;
    }

    prevButton.addEventListener("click", function () {
        slideTo(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        slideTo(currentIndex + 1);
    });
});