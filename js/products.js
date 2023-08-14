document.addEventListener('DOMContentLoaded', function () {
    let url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
    
    fetch(url)
       .then(response => response.json())
       .then(data => {
        let element = document.getElementById('objet-conteiner')
        
         data.products.map((x) => {
            element.innerHTML +=`
            <div class="cards">
                 <img src="${x.image}" class="img-card" alt="${x.name}">
                 <div class="body-card">
                   <h4 class="text-card">${x.name}</h4>
                   <p>${x.description}</p>
                   <p>${x.cost}</p>
                 </div>
            </div>
            `;
         });
        console.log(data.products);
       })
       .catch(error => console.log('Error:', error));   
 });
 