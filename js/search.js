document.addEventListener("DOMContentLoaded", function () {
    const listabusqueda = [];  // Declaramos una lista vacía donde irán los resultados del fetch
    const busqueda = document.getElementById('busqueda'); // Declaramos la variable busqueda que toma el elemento de id busqueda
    let contenedor = document.getElementById("containerSearch"); // Tomamos el contenedor por su id
    let idobjetos = 100;

    for (let index = 0; index < 3; index++) {
        idobjetos++;
        let url = 'http://localhost:3000/cats_products/' + idobjetos; // Armamos la URL del catid por cada bucle

        fetch(url) // Realizamos el fetch de la URL construida anteriormente
            .then(response => response.json())
            .then(responseData => {
                let data = responseData;
                listabusqueda.push(data); // Pusheamos todo el objeto de categoría a la lista
            })
            .catch(error => console.log('Error:', error));
    }

    function filtradobusqueda(lista, busqueda) { // Función que filtra por nombre y descripción 
        return lista.filter(categoria => {
            return categoria.products.some(product => product.name.toLowerCase().includes(busqueda) || product.description.toLowerCase().includes(busqueda)); // Filtramos categorías que contienen productos que cumplen el criterio de búsqueda
        });
    }

    busqueda.addEventListener('input', () => { // Evento input para búsqueda
        let inputtext = busqueda.value.trim().toLowerCase(); // Tomamos el valor de la búsqueda, lo convertimos a minúsculas y eliminamos espacios en blanco al principio y al final
        if (inputtext === '') {
            contenedor.innerHTML = ``;
        } else {
            let busquedafiltrada = filtradobusqueda(listabusqueda, inputtext); // Pasamos como argumentos la lista que tiene los datos de las categorías y también el valor del input de búsqueda
            console.log(busquedafiltrada); // Mostramos en la consola todas las categorías que contienen productos filtrados

            hojaBusqueda(busquedafiltrada);
        }
    });

    function hojaBusqueda(array) {  //toma el array que contiene los  datos de todas las categorias de productos y los mismos
        console.log(array);
        let productoslistados = [];  //lista vacia para colocar solo los productos de las categorias

        for (let i = 0; i < array.length; i++) {
            const categoria = array[i];
            productoslistados = productoslistados.concat(categoria.products);  //itera entre las categorias de productos y pasa los productos a una lista
        }

        console.log(productoslistados);
        contenedor.innerHTML = ``;  //contenedor vacio para las tarjetas de productos

        if (productoslistados.length > 4) {  // esta parte de la funcion solo va a permitir mostrar 4 productos de los encontrados 
            for (let index = 0; index < 4; index++) {   //las tarjetas creadas al hacerles click se va a ejecutar la funcion setProductIdAndCat que va a alojar en el localstorage el id y categoria del producto seleccionado
                const producto = productoslistados[index];
                contenedor.innerHTML += `<div class="shadow srLink btn btn-outline-light btn-lg btn-light btn-block mouseHover" onclick="setProductIdAndCat(${producto.id}, ${array[0].catID})">     
                <img src="${producto.image}" class="miniImage">
                <h4>${producto.name}</h4> 
                <h6>${producto.description}</h6>
                </div>`;
            }
        } else {
            for (let index = 0; index < productoslistados.length; index++) {
                const producto = productoslistados[index];
                contenedor.innerHTML += `<div class="srLink btn btn-outline-light btn-lg btn-light btn-block card-class mouseHover" onclick="setProductIdAndCat(${producto.id}, ${array[0].catID})">     
                <img src="${producto.image}" class="miniImage">
                <h4>${producto.name}</h4> 
                <h6>${producto.description}</h6>
                </div>`;
            }
        }
    }

});

function setProductIdAndCat(id, cat) {   //funcion que cambia los valores de id y catID del localstorage
    localStorage.setItem("productID", id);
    localStorage.setItem("catID", cat);
    window.location.href = "product-info.html";
}

