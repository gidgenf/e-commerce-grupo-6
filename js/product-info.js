document.addEventListener("DOMContentLoaded", function () {
    const listabusqueda = [];  //declaramos una lista vacia donde iran los resultados del fetch

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
               let filtrado = filterById(listabusqueda);
                console.log(filtrado);
            })
            .catch(error => console.log('Error:', error));


    }

    function filterById(list) {

        let productID = localStorage.getItem('productID').valueOf
        list.forEach(element => {
            if (productID === element.id) {
                return true
            }
        });
    }
});



//id producto
//lista productos
//funcion que busque al producto dentro de la lista y devuelva sus datos

