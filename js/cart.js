document.addEventListener('DOMContentLoaded', () => {
    const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

    let cartList= []

    fetch(URLidcart)
        .then(response => {
            return response.json();
        })
        .then(cartdata => {
            localStorage.setItem('usercartprecharged', JSON.stringify(cartdata));

            const storedCartData = JSON.parse(localStorage.getItem('usercartprecharged'));
            console.log(storedCartData)
            cartList.push(storedCartData.articles);
            console.log(cartList)
        })
        .catch(error => console.error('Error:', error));
<<<<<<< Updated upstream
});








=======
>>>>>>> Stashed changes

        const carrito= JSON.parse(localStorage.getItem('usercart'))
        console.log(carrito)

});