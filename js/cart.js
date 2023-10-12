document.addEventListener('DOMContentLoaded', () => {
    const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

articles = []

    let carrito = document.getElementById("carrito")
    fetch(URLidcart)
        .then(response => {
            return response.json();
        })
        .then(cartdata => {

            console.log (cartdata)
            articles.push(cartdata.articles)
            console.log(articles)
            showarticles(articles)
        })
        .catch(error => console.error('Error:', error));
        
});

function showarticles(articles){ 
    carrito.inerHTML=``
    articles.forEach(element => {
        carrito.inerHTML+= `<div class="card text-bg-dark">
<img src="${element.image}" class="card-img" alt="...">
<div class="card-img-overlay">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  <p class="card-text"><small>Last updated 3 mins ago</small></p>
</div>
</div>`
    });
}

