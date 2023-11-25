const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let localCart = JSON.parse(localStorage.getItem('usercart'));
let articles = [];
let cardMoney = document.getElementById('cardMoney')
let cart = document.getElementById('cart')
let changespurch = document.getElementById('changespurch')
let creditCardForm = document.getElementById('creditCardForm');
let bankTransferForm = document.getElementById('bankTransferForm');
let creditCardOption = document.getElementById('creditCardOption');
let bankTransferOption = document.getElementById('bankTransferOption');

fetch(URLidcart)
    .then(response => {
        return response.json();
    })
    .then(cartdata => {

        cartdata.articles.push(...localCart)
        articles.push(cartdata.articles);

        console.log(articles);
        showarticles(articles);
        showMoney(articles)
    })
    .catch(error => console.error('Error:', error));

changespurch.addEventListener('click', () => {
    showMoney(articles);
})

function showarticles(articles) {
    cart.innerHTML = ``
    articles[0].forEach(element => {
        cart.innerHTML += `
        <div class="container text m-3 my-5 shadow">
            <div class="text card-header">
                <h5 class="float-end card-text">cantidad:<span class="badge bg-primary rounded-pill cardCount">${element.count}</span></h5>
                <h3 class="card-title">${element.name}</h3>
            </div>
        <div class="container">
        <div class="row align-items-start">
            <img src="${element.image}" class="col-lg-3 img-fluid mx-2">
           
            <button onclick="changeQuantity(${element.id}, false)" type="button" class="btn m-1 col btn-danger btn-sm">Disminuir</button>
            <button onclick="changeQuantity(${element.id}, true)" type="button" class="btn m-1  col btn-primary btn-sm">Aumentar</button>
            <button onclick="removeArticle(${element.id})" type="button" class="btn btn-danger m-3 mt-1 col btn-sm">Eliminar</button>
            <div class="container text-center">
            <p class="btn float-end col btn-success">Total ${element.currency} ${element.unitCost * element.count}</p>
        </div>  
            </div>
            </div>
    </div>`
    });

}

function changeQuantity(id, value) {
    let product = articles[0].find(item => item.id === id);
    if (value) {
        product.count++;
        addToCart(id);
    } else if (product.count > 0) {
        product.count--;
        restToCart(id);
    }

    showarticles(articles);
    showMoney(articles)
}

function showMoney(articles) {
    let valorActivo = document.querySelector('input[name="listGroupRadio"]:checked').value;
    let Cost = 0;
    cardMoney.innerHTML = ``
    articles[0].forEach(element => {
        Cost += element.unitCost * element.count;
    });
    let costoDeEnvio = Cost * (valorActivo * 0.01);
    totalCost = Cost + costoDeEnvio;
    cardMoney.innerHTML = `
<div class="row">
    <div class="col-lg-12">
        <div class="card">
            <h1 class="">Costos</h1>
        <div class="card-body">
        <h4 class="border p-3">costo de envio  ${costoDeEnvio}<h4>
        <h4 class="border p-3" >valor de los objetos ${Cost}<h4>
        <h5 class="border p-3">total a pagar ${totalCost}</h5>
    </div>
</div>`
}

creditCardOption.addEventListener('change', function () {
    toggleRequireAttributes();
    creditCardForm.style.display = 'block';
    bankTransferForm.style.display = 'none';
});

bankTransferOption.addEventListener('change', function () {
    toggleRequireAttributes();
    creditCardForm.style.display = 'none';
    bankTransferForm.style.display = 'block';
});

function toggleRequireAttributes() {
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    const codigoSeguridad = document.getElementById('codigoSeguridad');
    const vencimiento = document.getElementById('vencimiento');
    const numeroCuenta = document.getElementById('numeroCuenta');

    const isBankTransfer = bankTransferOption.checked;

    numeroTarjeta.required = !isBankTransfer;
    codigoSeguridad.required = !isBankTransfer;
    vencimiento.required = !isBankTransfer;
    numeroCuenta.required = isBankTransfer;

    numeroTarjeta.disabled = isBankTransfer;
    codigoSeguridad.disabled = isBankTransfer;
    vencimiento.disabled = isBankTransfer;
    numeroCuenta.disabled = !isBankTransfer;
}

function removeArticle(id) {

    articles[0] = articles[0].filter((item) => item.id !== id);
    removeArticleInLocalStorage(id)
    showarticles(articles);
    showMoney(articles);
}

function removeArticleInLocalStorage(id) { //funcion para remover del carrito el

    let usercart = JSON.parse(localStorage.getItem('usercart')) || []; //se trae el carrito del local storage o una lista vacia
    const productexist = usercart.find(item => item.id === id); //se busca el producto en el carrito
    if (productexist) { //si el producto existe se lo elimina del carrito
        usercart.splice(productexist, 1)
    }

    localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage
}
function restToCart(id) {

    let usercart = JSON.parse(localStorage.getItem('usercart')) || [];  //se trae el carrito del local storage o una lista vacia

    const productexist = usercart.find(item => item.id === id);  //se busca el producto en el carrito
    if (productexist) {  //si el producto existe en el carrito, se eleva su contador en 1
        productexist.count--;
        localStorage.setItem('usercart', JSON.stringify(usercart));
    }
}

function addToCart(id) {

    let usercart = JSON.parse(localStorage.getItem('usercart')) || [];  //se trae el carrito del local storage o una lista vacia

    const productexist = usercart.find(item => item.id === id);  //se busca el producto en el carrito
    if (productexist) {  //si el producto existe en el carrito, se eleva su contador en 1
        productexist.count++;
    } else {
        usercart.push({  //se pushea el producto al carrito en caso de no existir en el mismo
            id: productId.id,
            name: productId.name,
            count: 1,
            unitCost: productId.cost,
            currency: "USD",
            image: productId.images[0]
        });
    }

    localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage

    console.log(localStorage.getItem('usercart'));
}
function hasZeroCount() {
    const cardCounts = document.querySelectorAll(".cardCount");
    return Array.from(cardCounts).some(element => element.textContent === '0');
}

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    let alertDanger = document.getElementById('alert-danger')
    let alertSuccess = document.getElementById('alert-success')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity() || (hasZeroCount())) {
                event.preventDefault()
                event.stopPropagation()
                alertDanger.classList.remove('d-none')
                setTimeout(() => { alertDanger.classList.add('d-none'); }, 3000)
            }
            form.classList.add('was-validated')
            event.preventDefault()
            alertSuccess.classList.remove('d-none')
            setTimeout(() => { alertSuccess.classList.add('d-none'); }, 3000)
        }, false)
    })
})()