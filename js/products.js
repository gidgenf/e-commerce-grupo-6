document.addEventListener('DOMContentLoaded', function () {
   let url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

   fetch(url)
      .then(response => response.json())
      .then(data => {
         let element = document.getElementById('objet-conteiner')

         data.products.map((x) => {
            element.innerHTML += `
            <a href="product-info.html" class"links-products">
            <div class="cards">
                 <img src="${x.image}" class="img-card" alt="${x.name}">
                 <div class="body-card">
                   <h4 class="text-card card-title">${x.name}</h4>
                   <p class="text-card description">${x.description}</p>
                   <p class="text-card">${x.cost}$</p>
                 </div>
            </div>
            </a> 
            `;
         });
<<<<<<< HEAD
        console.log(data);
       })
       .catch(error => console.log('Error:', error));   
 });
 
=======
         console.log(data.products);
      })
      .catch(error => console.log('Error:', error));
});
>>>>>>> Desarrollo
