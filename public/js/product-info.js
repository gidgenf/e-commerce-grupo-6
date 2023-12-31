document.addEventListener("DOMContentLoaded", () => {
    const btnPurch = document.getElementById('purch')
    const productosRelacionados = [];   //lista a donde van todos los productos de la categoria

    const idProduct = localStorage.getItem('productID');
    const btnaddtocart = document.getElementById('addtocart');
    const ratingContainer = document.querySelector('.rating');
    const stars = ratingContainer.querySelectorAll('.star');
    let btncommenting = document.getElementById('btncommenting');

    const URL = PRODUCT_INFO_URL + `${idProduct}`;
    let urlComments = "http://localhost:3000/products_comments/" + idProduct;

    let actualproduct = null;  //se va a usar para manejar el producto en su interacción con el carrito
    let container = document.getElementById('container');
    let selectedScore = 0; // Variable global para almacenar la calificación seleccionada.
    const starsrate = document.querySelectorAll('.rating .star');

    getComments(urlComments) //trae los comentarios del producto
    loadCommentsFromLocalStorage(idProduct); //trae los comentarios del porducto adicionales segun su id

    fetch(URL) 
        .then(response => response.json())
        .then(responseData => {
            let data = responseData;
            actualproduct = data;
            productosRelacionados.push(data.relatedProducts);
            productImages(data)
            mostrarTarjetasRelacionadas(productosRelacionados[0]);
            showProductInfo(data);
        })
        .catch(error => console.log('Error:', error));

    function getComments(url) {  //trae los comentarios del objeto en base a su id directo de la api

        const promise = fetch(url)
            .then(response => response.json())
            .then(responseData => {
                let data = responseData
                showComments(data)
            })
            .catch(error => console.log('Error:', error));
    };

    btnaddtocart.addEventListener('click', () => {  //evento click para el boton de addtocart que agrega el producto actual

        addtocart(actualproduct);

    });

    btnPurch.addEventListener('click', () => { //evento click para el boton de addtocart que agrega el producto actual y redirecciona a la ventana del carrito
        addtocart(actualproduct);
        window.location.href = "cart.html";
    })

    function addtocart(product) {

        let usercart = JSON.parse(localStorage.getItem('usercart')) || [];  //se trae el carrito del local storage o una lista vacia

        const productexist = usercart.find(item => item.id === product.id);  //se busca el producto en el carrito
        if (productexist) {  //si el producto existe en el carrito, se eleva su contador en 1
            productexist.count++;
        } else {
            usercart.push({  //se pushea el producto al carrito en caso de no existir en el mismo
                id: product.id,
                name: product.name,
                count: 1,
                unitCost: (product.currency === "USD") ? product.cost : Math.round(product.cost / 40),
                currency: "USD",
                image: product.images[0]
            });
        }

        localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage

        console.log(localStorage.getItem('usercart'));
    }

    function showProductInfo(product) {   //crea un elemento div con los datos del producto y lo coloca en el contenedor
        container.innerHTML = '';
        container.innerHTML = `
                <div class="row align-self-end">
                    <div class="text-align-center overflow-hidden">
                        <h1 class="card-title text fs-1">${product.name}</h2>
                        <h2 class="card-text text fs-3">${product.description}<h4>
                        <h2 class="card-text text fs-3">cantidad de ventas: ${product.soldCount}</h5>
                        <h2 class="card-text text fs-3">$${product.cost}</h3>
                    </div>
                </div>`;
    }

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

    //se le agrega un evento click al boton de enviar comentario que guarda su estructura en el local storage y luego lo muestra como un nuevo comentario del producto
    btncommenting.addEventListener('click', () => {
        let userData = JSON.parse(localStorage.getItem('userdata'));
        let commentText = document.getElementById('commenttext').value;
        let dateTipe = new Date().toLocaleString();

        const commentStructure = {
            product: localStorage.getItem('productID'),
            score: selectedScore,
            description: commentText,
            date: dateTipe,
            user: userData.name || userData.email //si no hay aún un name asignado, este tomará el email
        };

        saveCommentToLocalStorage(commentStructure);
        displayComment(commentStructure);
        document.getElementById('commenttext').value = '';  //limpia el campo donde se escribe el comentario ingresado
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

    // Se invoca después de que un comentario es enviado para reiniciar la calificación seleccionada y las estrellas a su estado inicial.
    function resetStars() {
        stars.forEach(star => {
            star.style.color = 'black';
        });
        selectedScore = 0; // Reiniciar la calificación seleccionada.
    }

    //toma el id del producto y trae los comentarios del mismo, luego muestra cada uno por medio de la funcion displayComment
    function loadCommentsFromLocalStorage(productId) {
        let comments = JSON.parse(localStorage.getItem('userComments')) || [];
        const productComments = comments.filter(comment => comment.product === productId);
        productComments.forEach(comment => displayComment(comment));
    }

    function mostrarTarjetasRelacionadas(productos) {  //toma los productos relacionados y los envia dentro de un carrucel
        let relatedProduct = document.getElementsByClassName('carousel-inner')[1];
        relatedProduct.innerHTML = '';

        productos.forEach((product, index) => {
            const card = `
                <div class="card-class carousel-item ${index === 0 ? 'active' : ''}" alt="..." onclick="setProductID(${product.id})"> 
                    <img src="${product.image}" class="img-fluid" alt="${product.name}"> 
                </div>
            `;
            relatedProduct.innerHTML += card;
        });
    }

    function productImages(productinfo) {  //toma la información del producto y accede a sus imagenes para luego convertirlas en elementos de un carrucel
        let imagesarray = productinfo.images
        let imagescarousel = document.getElementsByClassName('carousel-inner')[0];

        imagescarousel.innerHTML = '';

        imagesarray.forEach((images, index) => {
            const imagecard = ` 
            
            <div class="card-class carousel-item ${index === 0 ? 'active' : ''}" alt="...">
                <img class="h-auto d-inline-block w-100 img-fluid" src="${images}">
            </div>`

            imagescarousel.innerHTML += imagecard;
            ;
        });
    }
});

function setProductID(id) {
    localStorage.setItem("productID", id);        //setea el ID del producto y nos relocaliza a product-info.html
    window.location.href = "product-info.html";
}


