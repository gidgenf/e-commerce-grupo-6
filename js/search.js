document.addEventListener("DOMContentLoaded", function () {
    const listabusqueda = [];  //declaramos una lista vacia donde iran los resultados del fetch
    const busqueda = document.getElementById('busqueda'); //declaramos variable busqueda que toma el elemento de id busqueda

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
        if (inputtext === '') {
            contenedor.innerHTML = ``;
        } else {
            let busquedafiltrada = filtradobusqueda(listabusqueda, inputtext); //se pasan como argumentos la lista que tiene los datos de los productos y tambien el valor del input de busqueda
            console.log(busquedafiltrada); //se muestra en consola todos los elementos filtrados

            hojaBusqueda(busquedafiltrada);
        }
    });

    document.getElementById('cerrarSesion').addEventListener('click', function () {  //function que cierra sesión por medio del evento click en el elemento de id "cerrarSesion"
        localStorage.removeItem('authenticated');
        window.location.href = "login.html";
    });
});

function setProductID(id) {
    localStorage.setItem("productID", id);       
    window.location.href = "product-info.html";
}

let contenedor = document.getElementById("containerSearch") //tomamos el contenedor por su id
function hojaBusqueda(array) {
    contenedor.innerHTML = ``
    if (array.length > 4) {
        for (let index = 0; index < 4; index++) {
            const element = array[index];
            contenedor.innerHTML += `<div class="srLink btn btn-outilne-light btn-lg  btn-light btn-block mouseHover" onclick="setProductID(${element.id})">
            <img src="${element.image}" class="miniImage">
            <h4>${element.name}</h4> 
<h6>${element.description}</h6>
</div>`
        }
    } else {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            contenedor.innerHTML += `<div class="srLink btn btn-outline-light btn-lg btn-light btn-block mouseHover" onclick="setProductID(${element.id})">     
            <img src="${element.image}" class="miniImage">
            <h4>${element.name}</h4> 
    <h6>${element.description}</h6>
    </div>`
        }
    }
}