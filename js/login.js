document.getElementById('sesionIni').addEventListener('click', function () {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('pswd').value;
    if (!contraseña || !usuario) {
        window.alert ("Debes completar los campos vacíos!");
    } else {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem("user-name", usuario)
        window.location.href = "index.html";
    }
});

/*
Se le agrega un evento 'click' al boton de id="sesionIni", 
establece las constantes locales de usuario y contraseña 
y luego atravez de un if en el caso de que falten la contraseña o
el usuario, el boton sesionIni no responderá y se ejecutará una alerta, y en caso positivo
redireccionará a index.html y establecera en localStorage
authentificated con valor true
*/


