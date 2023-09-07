document.addEventListener("DOMContentLoaded", function () {
    const listabusqueda = [];
    const fetchPromises = [];
    
    //for que genera las url de las categorias para luego obtener el data.products en cada iteración
    let idobjetos = 100;
    for (let index = 0; index < 3; index++) {
        idobjetos++
        let catID_json = idobjetos + ".json";
        let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;  //arma un url del catid por cada bucle

        const promise = fetch(url)                      //se realiza un fetch que usa la irl formada anteriormente y se pushea sus datos en listabusqueda
            .then(response => response.json())          //al mismo tiempo se convierte en constante y se pushea dentro de fetchPromises que se usará luego
            .then(responseData => {
                let data = responseData;
                listabusqueda.push(...data.products);
            })
            .catch(error => console.log('Error:', error));

        fetchPromises.push(promise);
    }

    Promise.all(fetchPromises)  //promise.all lo que hace es tomar un array de promesas y se asegura que todas se interpreten como 1 sola, si alguna de ellas no se cumple la promesa fracasa
        .then(() => {
            searchProductById();
        })
        .catch(error => console.log('Error', error));

    function searchProductById() {  //funcion que busca por medio del id del local storage, se usa find para encontrar el equivalente dentro de listabusqueda
        const idProduct = localStorage.getItem('productID');

        if (idProduct) {
            const productSearch = listabusqueda.find(product => parseInt(product.id) === parseInt(idProduct));
                console.log(productSearch);
            
        }
    }
});
