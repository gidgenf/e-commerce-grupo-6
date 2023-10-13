document.addEventListener('DOMContentLoaded', () => {
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
 <h5 class="float-end card-text">cantidad:<span class="badge bg-primary rounded-pill">${element.count}</span></h5>
 <h3 class="card-title">${element.name}</h3>
  </div>
  <div class="card-body">
    <img src="${element.image}" style="width: 10rem;" >
    <div class="dropdown-center float-end">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    opciones
    </button>
    <ul class="dropdown-menu">
      <li><input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" checked>
      <label class="form-check-label" for="firstRadio">premium 2 a 5 dias (17%)</label></li>
      <li><input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""  checked>
      <label class="form-check-label" for="firstRadio">express 5 a 8 dias (7%)</label></li>
      <li><input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""  checked>
      <label class="form-check-label" for="firstRadio">standard 8 a 12 dias (5%) </label></li>
    </ul>
</div>
   <p class="btn btn-success position-absolute bottom-0 m-3 end-0 ">${element.currency}${element.unitCost*element.count }</p>
</div>
</div>`
            

    });
}
});