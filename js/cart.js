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
                <div class="card mt-5 mx-5 text-bg-dark">
                <img src="${element.image}" class="card-img" alt="...">
                <div class="card-img-overlay">
               <h4 class="card-title">${element.name}</h4>
               <p class="card-text">${element.currency}${element.unitCost}</p>
               <h5 class="card-text">cantidad:<span class="badge bg-primary rounded-pill">${element.count}</span></h5>
               </div>
            </div>`
            

    });
}
});