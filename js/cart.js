document.addEventListener('DOMContentLoaded', () => {
    const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

    fetch(URLidcart)
        .then(response => {
            return response.json();
        })
        .then(cartdata => {
            localStorage.setItem('usercartprecharged', JSON.stringify(cartdata));

            const storedCartData = JSON.parse(localStorage.getItem('usercartprecharged'));
            const storedCart = JSON.parse(localStorage.getItem('usercart'));

            console.log(storedCartData);
            console.log(storedCart);
        })
        .catch(error => console.error('Error:', error));















});
