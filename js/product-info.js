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
 
let selectedScore = 0; // Variable global para almacenar la calificación seleccionada.

document.addEventListener("DOMContentLoaded", function() {
    loadCommentsFromLocalStorage();

    const stars = document.querySelectorAll('.rating .star');
    stars.forEach(star => {
        star.addEventListener('click', setRating);
    });

    function setRating(e) { // Dentro de setRating, obtenemos el "score" (calificación) de la estrella seleccionada.
        selectedScore = parseInt(e.target.getAttribute('score'));
        stars.forEach(star => {
            if (parseInt(star.getAttribute('score')) <= selectedScore) {
                star.style.color = 'gold';
            } else {
                star.style.color = 'black';
            }
        });
    }

    let btncommenting = document.getElementById('btncommenting');
    btncommenting.addEventListener('click', function() {
        let userName = localStorage.getItem('user-name');
        let descripcion = document.getElementById('commenttext').value;
        let dateTipe = new Date().toLocaleString();

        const commentStructure = {
            product: localStorage.getItem('productID'),
            score: selectedScore,
            description: descripcion,
            date: dateTipe,
            user: userName
        };

        saveCommentToLocalStorage(commentStructure);
        displayComment(commentStructure);
        document.getElementById('commenttext').value = '';
        resetStars();
    });

    function saveCommentToLocalStorage(comment) {
        let comments = JSON.parse(localStorage.getItem('userComments')) || [];
        comments.push(comment);
        localStorage.setItem('userComments', JSON.stringify(comments));
    }
// Las funciones saveCommentToLocalStorage y displayComment se encargan de guardar los comentarios en localStorage y mostrarlos en la página, respectivamente.
    function displayComment(comment) {
        let commentsdiv = document.getElementById('commentsdiv');
        commentsdiv.innerHTML += `
            <li class="list-group-item">
                <p>${comment.user} - ${comment.date} - ${generateStars(comment.score)}</p>
                <p>${comment.description}</p>
            </li>`;
    }

    function generateStars(score) { // Toma un número (la calificación) y devuelve una cadena de caracteres que contiene estrellas doradas según el número dado.
        let stars = '';
        for (let i = 0; i < score; i++) {
            stars += `<span class="fa fa-star" style="color: gold;"></span>`;
        }
        for (let i = score; i < 5; i++) {
            stars += `<span class="fa fa-star"></span>`;
        }
        return stars;
    }

    function resetStars() { // Se invoca después de que un comentario es enviado para reiniciar la calificación seleccionada y las estrellas a su estado inicial.
        stars.forEach(star => {
            star.style.color = 'black';
        });
        selectedScore = 0; // Reiniciar la calificación seleccionada.
    }

    function loadCommentsFromLocalStorage() { // Se encarga de cargar y mostrar todos los comentarios guardados en localStorage cuando se carga la página.
        let comments = JSON.parse(localStorage.getItem('userComments')) || [];
        comments.forEach(comment => displayComment(comment));
    }
});
