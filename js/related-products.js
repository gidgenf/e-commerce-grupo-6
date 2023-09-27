document.addEventListener("DOMContentLoaded", function () {

    const catID = localStorage.getItem("catID");  //se declara la constante catID del local storage catID
    const idProduct = localStorage.getItem('productID');

    let catID_json = catID + ".json";
    let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;

    console.log(idProduct)


    fetch(url) // fetch que muestra los productos 
        .then(response => response.json())
        .then(responseData => {
            data = responseData;
            let productosRelacionados = data.products.filter(x => x.id !== idProduct);
            mostrarTarjetas(productosRelacionados);
            console.log(productosRelacionados)
        })
        .catch(error => console.log('Error:', error));


    function setProductID(id) {
        localStorage.setItem("productID", id);        //setea el ID del producto y nos relocaliza a product-info.html
        window.location.href = "product-info.html";
    }

    const prevButton = document.getElementById("move-left");
    const nextButton = document.getElementById("move-right");
    const relatedProducts = document.getElementById("relatedProducts");

    let currentIndex = 0;
    const cardWidth = 200; // Ancho de cada tarjeta en píxeles
    const cardMargin = 20; // Margen entre tarjetas en píxeles

    function slideTo(index) {
        const totalSlides = relatedProducts.children.length;

        if (index < 0) {
            index = totalSlides - 1; // Ir al último slide si estamos en el primero
        } else if (index >= totalSlides) {
            index = 0; // Volver al primer slide si estamos en el último
        }

        currentIndex = index;

        const translateX = -currentIndex * (cardWidth + cardMargin);
        relatedProducts.style.transform = `translateX(${translateX}px)`;
    }

    prevButton.addEventListener("click", function () {
        slideTo(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        slideTo(currentIndex + 1);
    });
});