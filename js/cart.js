 const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let localCart = JSON.parse(localStorage.getItem('usercart'));
let articles = [];
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
        })
        .catch(error => console.error('Error:', error));

        function showarticles(articles){ 
            cart.innerHTML=``
            articles[0].forEach(element => {
                cart.innerHTML += `
                <div class="card m-3 shadow">
  <div class="card-header">
 <h5 class="float-end card-text" onclick="reloco()">cantidad:<span class="badge bg-primary rounded-pill">${element.count}</span></h5>
 <h3 class="card-title">${element.name}</h3>
  </div>
  <div class="card-body">
    <img src="${element.image}" style="width: 10rem;" >
   <p class="btn btn-success position-absolute bottom-0 m-3 end-0" >Total ${element.currency}${element.unitCost*element.count }</p>
   <h5 class="float-end card-text">
    cantidad:
    <button onclick="changeQuantity(${element.id}, true)" type="button" class="btn btn-primary btn-sm">Aumentar</button>
    <button onclick="changeQuantity(${element.id}, false)" type="button" class="btn btn-danger btn-sm">Disminuir</button>
</h5>
</div>
</div>`
            


});
}
function changeQuantity(id, increase) {
    let product = articles[0].find(item => item.id === id);
    if (increase) {
        product.count++;
    } else {
        if (product.count > 1) {
            product.count--;
        }
    }
    showarticles(articles);
}
   


