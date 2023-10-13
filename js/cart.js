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
    <blockquote class="blockquote mb-0">
    <img src="${element.image}" style="width: 14rem;" >
    <p class="card-text">${element.currency}${element.unitCost}</p>
    </blockquote>
  </div>
</div>`
            

    });
}
});