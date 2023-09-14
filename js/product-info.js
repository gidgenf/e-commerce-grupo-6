document.addEventListener("DOMContentLoaded", function () {
    let commentsDiv = document.getElementById('commentsdiv');
    let commentsContenedor = localStorage.getItem('comments'); // Obtener los comentarios almacenados en localStorage

    // Verificar si hay comentarios en localStorage
    if (commentsContenedor) {
        commentsDiv.innerHTML = commentsContenedor;
    }

    const listabusqueda = [];
    const fetchPromises = [];

    // for que genera las URL de las categorías para luego obtener el data.products en cada iteración
    let idobjetos = 100;
    for (let index = 0; index < 3; index++) {
        idobjetos++
        let catID_json = idobjetos + ".json";
        let url = 'https://japceibal.github.io/emercado-api/cats_products/' + catID_json;  //arma un URL del catid por cada bucle

        const promise = fetch(url)                      //se realiza un fetch que usa la URL formada anteriormente y se pushea sus datos en listabusqueda
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

    function searchProductById() {  //función que busca por medio del id del local storage, se usa find para encontrar el equivalente dentro de listabusqueda
        const idProduct = localStorage.getItem('productID');

        if (idProduct) {
            const productSearch = listabusqueda.find(product => parseInt(product.id) === parseInt(idProduct));
            console.log(productSearch);
            showPoductInfo(productSearch);
        }
    }

    let container = document.getElementById('container');

    function showPoductInfo(product) {
        container.innerHTML = '';
        container.innerHTML = `<div>
            <img class="img-card-top img-main" src="${product.image}">
        </div>
        <div class="card" style="width: 22rem;">
            <div class="card-body card-buy">
                <div>
                    <h2 class="card-title">${product.name}</h2>
                    <h4 class="card-text">${product.description}</h4>
                </div>
                <h3 class="card-text">$${product.cost}</h3>
                <input type="text" id="commenttext" placeholder="Ingresa un comentario">
                <button id="btncommenting" class="btn btn-primary">Enviar</button>
            </div>
        </div>`;

    }

    const ratingContainer = document.querySelector('.rating');
    const stars = ratingContainer.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', setRating);
    });

    function setRating(e) {
        const rating = e.target.getAttribute('data-rating');
        const stars = ratingContainer.querySelectorAll('.star'); 

        stars.forEach(star => {
            if (star.getAttribute('data-rating') <= rating) {
                star.style.color = 'gold';
            } else {
                star.style.color = 'gray';
            }
        });
    }

    let btncommenting = document.getElementById('btncommenting');

    btncommenting.addEventListener('click', () => {
        var hoy = new Date();
        var fechaHoy = hoy.toLocaleDateString();
        console.log(fechaHoy);

        let goldStarsCount = document.getElementById('estrellas').innerHTML
        const commenttext = document.getElementById('commenttext').value;
        const user = localStorage.getItem('user-name');

        const commentHTML = `<div class=comment>
                                <p>${user}</p>
                                <p>${fechaHoy}</p>
                                <p>${goldStarsCount}</p>
                            <div>${commenttext}</div>
                            </div>`;

        commentsdiv.innerHTML += commentHTML;

        commentsContenedor += commentHTML;
        localStorage.setItem('comments', commentsContenedor);
        console.log(commentHTML)
    });

});
