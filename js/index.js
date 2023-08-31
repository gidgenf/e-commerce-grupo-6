document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });

    const listabusqueda = [];  //declaramos una lista vacia donde iran los resultados del fetch
    const busqueda = document.getElementById('busqueda'); //decalramos variable busqueda que toma el elemento de id busqueda

    let idobjetos = 100;
    for (let index = 0; index < 3; index++) {
        idobjetos++;
        let catID_json = idobjetos + ".json";
        let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json; //arma un url del catid por cada bucle

        fetch(url) //fetch del url anterior armado
            .then(response => response.json())
            .then(responseData => {
                let data = responseData; 
                listabusqueda.push(...data.products); //se pushea data.products del resultado dentro de la lista vacia
            })
            .catch(error => console.log('Error:', error));
    }

    function filtradobusqueda(lista, busqueda) { //funcion que filtra por nombre y descripcion 
        return lista.filter(products => {
            return products.name.toLowerCase().includes(busqueda) || products.description.toLowerCase().includes(busqueda); //filtra nombres y descripciones tomando la busqueda como criterio
        });
    }

    busqueda.addEventListener('input', () => { //evento input para busqueda
        let inputtext = busqueda.value; //se toma el valor de la busqueda
        let busquedafiltrada = filtradobusqueda(listabusqueda, inputtext); //se pasan como argumentos la lista que tiene los datos de los productos y tambien el valor del input de busqueda
        console.log(busquedafiltrada); //se muestra en consola el resultado 
    });

    document.getElementById('cerrarSesion').addEventListener('click', function () {  //function que cierra sesión por medio del evento click en el elemento de id "cerrarSesion"
        localStorage.removeItem('authenticated');
        window.location.href = "login.html";
    });
});

