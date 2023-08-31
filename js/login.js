document.getElementById('sesionIni').addEventListener('click', function () {
    let usuario = document.getElementById("usuario")
   
    const contraseña = document.getElementById('contraseña').value;
    if (!contraseña || !usuario.value) {
        alert("por favor rellene los campos vacios") //alert en caso de estar vacios los campos al intentar iniciar sesión
    } else {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem("user-name", usuario.value)
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


