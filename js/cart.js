const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let localCart = JSON.parse(localStorage.getItem('usercart'));
let articles = [];
let cardMoney = document.getElementById('cardMoney')
let cart = document.getElementById('cart')
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

function showarticles(articles) {
    cart.innerHTML = ``
    articles[0].forEach(element => {
        cart.innerHTML += `
                <div class="card m-3 shadow">
  <div class="card-header">
 <h5 class="float-end card-text">cantidad:<span class="badge bg-primary rounded-pill">${element.count}</span></h5>
 <h3 class="card-title">${element.name}</h3>
  </div>
  <div class="card-body">
    <img src="${element.image}" style="width: 10rem;" >
   <p class="btn btn-success position-absolute bottom-0 m-3 end-0" >Total ${element.currency}${element.unitCost * element.count}</p>
   <h5 class="float-end card-text">
    <button onclick="changeQuantity(${element.id}, false)" type="button" class="btn btn-danger btn-sm">Disminuir</button>
    <button onclick="changeQuantity(${element.id}, true)" type="button" class="btn btn-primary btn-sm">Aumentar</button>
</h5>
</div>
</div>`



    });
}
function changeQuantity(id, value) {
    let product = articles[0].find(item => item.id === id);
    if (value) {
        product.count++;
    } else {
        if (product.count > 1) {
            product.count--;
        }
    }
    showarticles(articles);
    showMoney(articles)
}

function showMoney(articles){
    let valorActivo = document.querySelector('input[name="listGroupRadio"]:checked').value;
    let totalCost = 0;
    cardMoney.innerHTML=``
  articles[0].forEach(element => {  
    totalCost += element.unitCost * element.count;
});
totalCost= totalCost- totalCost * (valorActivo*0.01);
cardMoney.innerHTML=`
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">total a pagar ${totalCost}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>`
}

