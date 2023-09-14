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

    const idProduct = localStorage.getItem('productID');

    function searchProductById() {  //función que busca por medio del id del local storage, se usa find para encontrar el equivalente dentro de listabusqueda

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
            <div class=" card-body card-buy">
            <div>
            <h2 class="card-title">${product.name}</h2>
            <h4 class="card-text">${product.description}<h4>
            </div>
            <h3 class="card-text">$${product.cost}</h3>
            <div>
            <button  class="btn btn-primary">comprar</button>
            <button  class="btn btn-success">agregar carrito</button>
            </div>
           </div>`;

    }

    const ratingContainer = document.querySelector('.rating');
    const stars = ratingContainer.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', setRating);
    });


    let goldStars = 0
    let blackStars = 0

    function setRating(e) {
        const rating = e.target.getAttribute('score');

        stars.forEach(star => {
            if (star.getAttribute('score') <= rating) {
                star.style.color = 'gold';
                goldStars += 1
            } else {
                star.style.color = 'black';
                blackStars += 1
            }
        });

    }

    let urlComments = "https://japceibal.github.io/emercado-api/products_comments/" + idProduct + ".json"

    function getComments(url) {  //trae los comentarios del objeto en base a su id directo de la api

        const promise = fetch(url)
            .then(response => response.json())
            .then(responseData => {
                let data = responseData
                console.log(data)
                showComments(data)

            })

            .catch(error => console.log('Error:', error));

    };

    getComments(urlComments)

    function showComments(data) {   //funcion que toma la data de los comentarios y los transforma para enviar al html como comentario
        let commentsdiv = document.getElementById('commentsdiv')

        data.forEach(element => {
            const formattedDate = dateChange(element.dateTime);

            commentsdiv.innerHTML += `<li class="list-group-item">
                                        <p>${element.user} - ${formattedDate} - ${starsScore(element.score)}</p>
                                        <p>${element.description}</p>
                                      </li>`
        });
    }

    function starsScore(score) {   //toma el score de estrellas y lo convierte en estrellas doradas
        starContainer = ``;
        for (let i = 0; i < score; i++) {
            starContainer += `<span class="fa fa-star star" style="color: gold;"></span>`
        }
        return starContainer
    }

    let btncommenting = document.getElementById('btncommenting');

    btncommenting.addEventListener('click', () => {    //add event listener para el boton de enviar comentario

        userName = localStorage.getItem('user-name');        //traemos los datos 
        score = goldStars
        goldStars = 0
        descripcion = document.getElementById('commenttext').value
        dateTipe = dateChange(new Date())

        const commentStructure = {   //arreglo de datos
            product: idProduct,
            score: score,
            description: descripcion,
            date: dateTipe,
            user: userName
        };

        console.log(dateTipe)
        console.log(commentStructure)

    });

    function dateChange(date) {  //cambio de fecha en base a la fecha actual o la fecha dentro del url API comments
        const dateComment = date;
        const dateNew = new Date(dateComment);

        const day = dateNew.getDate();
        const month = dateNew.getMonth() + 1;
        const year = dateNew.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }


});


