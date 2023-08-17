sesionIni.addEventListener('click', () => {
    const usuario = document.getElementById('usuario').value
    const contraseña = document.getElementById('contraseña').value
    if (!contraseña || !usuario) {

    } else {
        window.location.href = "index.html";
    }
});

/*
Se le agrega un evento 'click' al boton de id="sesionIni", 
establece las constantes locales de usuario y contraseña 
y luego atravez de un if en el caso de que falten la contraseña o
el usuario, el boton sesionIni no responderá, y en caso positivo
redireccionará a index.html
*/
document.addEventListener("DOMContentLoaded", function() {
    // Verifica si el usuario NO ha iniciado sesión
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = "login.html"; // Redirecciona al usuario a login.html si NO ha iniciado sesión
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Verifica si el usuario ya ha iniciado sesión
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = "index.html"; // Redirecciona al usuario a index.html si ya ha iniciado sesión
    }

    // Evento de click para el botón de inicio de sesión
    document.getElementById('sesionIni').addEventListener('click', function() {

        // Si el inicio de sesión es exitoso, guarda la información de la sesión
        localStorage.setItem('authenticated', 'true');

        // Redireccionar al usuario a index.html después del inicio de sesión exitoso
        window.location.href = "index.html";
    });
});