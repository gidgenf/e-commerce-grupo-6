document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    const listabusqueda = [];
    function catmomentaneo() { //funcion que mueve a una lista los elementos de las categorias
        let idobjetos = 100;
        for (let index = 0; index < 3; index++) {
            idobjetos++;
            let catID_json = idobjetos + ".json";
            let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;

            fetch(url)
                .then(response => response.json())
                .then(responseData => {
                    data = responseData;
                    listabusqueda.push(data.product)
                })
                .catch(error => console.log('Error:', error));
        }
    };
    function filtradobusqueda(lista, busqueda) {
        const valorbusqueda = busqueda.text
        return lista.filter(product => {
            return product.name.includes(valorbusqueda) || product.description.includes(valorbusqueda);
        });
    }
    const busqueda = document.getElementById('busqueda')

    busqueda.addEventListener('input', () => {
        let inputtext = busqueda
        filtradobusqueda(listabusqueda, inputtext)
        console.log(listabusqueda)
    });

});


/*cierra la sesion y quita la autentificacion*/
document.getElementById('cerrarSesion').addEventListener('click', function () {
    localStorage.removeItem('authenticated');
    window.location.href = "login.html";
});



