document.addEventListener("DOMContentLoaded", () => {

    const categoryList = [];   //lista a donde van todos los productos de la categoria
    const productCat = localStorage.getItem('catID');  //categoria actual del local storage
    const idProduct = localStorage.getItem('productID'); // ID del producto actual

    const url = `https://japceibal.github.io/emercado-api/cats_products/${productCat}.json`;

    fetch(url)                             // Fetch que utiliza el URL con el catID
        .then(response => response.json())
        .then(responseData => {
            let data = responseData;

            categoryList.push(...data.products);
            searchProductById(idProduct);
            mostrarTarjetas(categoryList, idProduct);
        })
        .catch(error => console.log('Error:', error));

    function searchProductById(id) {    //busca el producto por su id almacenada y lo muestra
        if (id) {
            const productSearch = categoryList.find(product => parseInt(product.id) === parseInt(id));

            showProductInfo(productSearch);
        }
    }

    let container = document.getElementById('container');

    function showProductInfo(product) {   //crea un elemento div con los datos del producto y lo coloca en el contenedor

        container.innerHTML = '';
        container.innerHTML = `<div>
            <img class="img-card-top img-main" src="${product.image}">
            </div>
            <div class="card" style="width: 22rem;">
            <div class=" card-body card-buy">
            <div>
            <h2 class="card-title">${product.name}</h2>
            <h4 class="card-text">${product.description}<h4>
            <h5 class="card-text">cantidad de ventas: ${product.soldCount}</h5>
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

    stars.forEach(star => {   //se le agrega un evento click a cada estrella que le pasa como argumento setRating()
        star.addEventListener('click', setCommentRating);
    });

    function setCommentRating(e) {   //al marcar una estrella tambien se marca el score, para todas las estrellas si el score es mayor se pintan de dorado y si es menor de negro
        const rating = e.target.getAttribute('score');

        stars.forEach(star => {
            if (star.getAttribute('score') <= rating) {
                star.style.color = 'gold';
            } else {
                star.style.color = 'black';
            }
        });
    }

    let urlComments = "https://japceibal.github.io/emercado-api/products_comments/" + idProduct + ".json"

    function getComments(url) {  //trae los comentarios del objeto en base a su id directo de la api

        const promise = fetch(url)
            .then(response => response.json())
            .then(responseData => {
                let data = responseData
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

    function starsScore(score) {   // función que crea estrellas segun el score del comentario mostrado
        starContainer = '';
        for (let i = 0; i < score; i++) {
            starContainer += '<span class="fa fa-star star" style="color: gold;"></span>';
        }

        for (let i = score; i < 5; i++) {
            starContainer += '<span class="fa fa-star star" style="color: black;"></span>';
        }
        return starContainer;
    }

    function dateChange(date) {  //cambio de fecha en base a la fecha actual o la fecha dentro del url API comments
        const dateComment = date;
        const dateNew = new Date(dateComment);

        const day = dateNew.getDate();
        const month = dateNew.getMonth() + 1;
        const year = dateNew.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    let selectedScore = 0; // Variable global para almacenar la calificación seleccionada.

    loadCommentsFromLocalStorage(idProduct);

    const starsrate = document.querySelectorAll('.rating .star');
    starsrate.forEach(star => {
        star.addEventListener('click', setRating);
    });

    function setRating(e) { // Dentro de setRating, obtenemos el "score" (calificación) para pintar las estrellas del comentario
        selectedScore = parseInt(e.target.getAttribute('score'));
        starsrate.forEach(star => {
            if (parseInt(star.getAttribute('score')) <= selectedScore) {
                star.style.color = 'gold';
            } else {
                star.style.color = 'black';
            }
        });
    }

    let btncommenting = document.getElementById('btncommenting');

    btncommenting.addEventListener('click', () => {
        let userName = localStorage.getItem('user-name');
        let commentText = document.getElementById('commenttext').value;
        let dateTipe = new Date().toLocaleString();

        const commentStructure = {
            product: localStorage.getItem('productID'),
            score: selectedScore,
            description: commentText,
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

    function loadCommentsFromLocalStorage(productId) {
        let comments = JSON.parse(localStorage.getItem('userComments')) || [];
        const productComments = comments.filter(comment => comment.product === productId);
        productComments.forEach(comment => displayComment(comment));
    }

    const prevButton = document.getElementById('move-left');
    const nextButton = document.getElementById('move-right');

    //nextButton.addEventListener('click', () => {
    // });

    // prevButton.addEventListener('click', () => {
    //});


    function mostrarTarjetas(productosRelacionados, id) {

        let relatedProduct = document.getElementsByClassName('carousel-inner')[0];

        relatedProduct.innerHTML = '';

        const filteredProducts = productosRelacionados.filter(product => parseInt(product.id) != parseInt(id));

        filteredProducts.forEach((product, index) => {

            const card = `
                <div class="card-class carousel-item ${index === 0 ? 'active' : ''}" alt="..." onclick="setProductID(${product.id})"> 
                    <img src="${product.image}" class="d-block w-100" alt="${product.name}"> 

                    <div class="carousel-caption d-none d-md-block">
                        <h4 class="product-title">${product.name}</h4>
                        <p class="product-price">${product.cost}$</p> 
                    </div>

                </div>
            `;
            relatedProduct.innerHTML += card;
        });
    }


    // function createIndicatorButtons() {
    //     let indicatorsDivButtons = document.getElementsByClassName('carousel-indicators')[0];

    //     const indicatorButton = document.createElement('button');
    //     indicatorButton.setAttribute('type', 'button');
    //     indicatorButton.setAttribute('data-bs-target', '#carouselExampleCaptions');
    //     indicatorButton.setAttribute('data-bs-slide-to', index.toString());
    //    indicatorButton.setAttribute('aria-label', `Slide ${index + 1}`);
    //    if (index === 0) {
    //        button.classList.add('active');
    //    }
    //    indicatorsDivButtons.appendChild(button);
    // }
});



