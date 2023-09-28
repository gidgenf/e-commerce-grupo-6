const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}
let name_user = localStorage.getItem("user-name");
let botonDeUsuario = document.getElementById("usuario")

botonDeUsuario.innerHTML = `<a class="nav-link" href="my-profile.html" data-tooltip="Perfil">${name_user} <i class="fa-solid fa-user"></i></a>`

document.getElementById('cerrarSesion').addEventListener('click', function () {  // Función que cierra sesión mediante el evento click en el elemento de id "cerrarSesion"
  localStorage.removeItem('authenticated');
  window.location.href = "login.html";
});


/*verifica que estén autentificado con anterioridad el inicio de sesion, 
en caso de no estar autentificado redirecciona al login.html*/
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('authenticated') !== 'true') {
    window.location.href = "login.html";
    localStorage.remove('authenticated');
  } 
});

