document.addEventListener('DOMContentLoaded', () => {
    const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

    fetch(URLidcart)
        .then(response => {
            return response.json();
        })
        .then(cartdata => {
            localStorage.setItem('usercart', JSON.stringify(cartdata));

            const storedCartData = JSON.parse(localStorage.getItem('usercart'));

            const productName = storedCartData.articles[0].name;
            console.log(productName);
        })
        .catch(error => console.error('Error:', error));
});


function addproductcart(productstring) {  //funcion que agrega producto al cart del local storage 
    localStorage.getItem('usercart', listproductstring)

}








