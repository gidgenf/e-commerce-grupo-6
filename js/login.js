document.getElementById('sesionIni').addEventListener('click', function () {
    const useremail = document.getElementById('usuario').value
    const contrasena = document.getElementById('pswd').value;
    if (!contrasena || !useremail) {
        window.alert("Debes completar los campos vacíos!");
    } else {
        localStorage.setItem('authenticated', 'true');
        saveEmail(useremail)
        window.location.href = "index.html";
    }
});

function saveEmail(mail) {
    console.log(userdata)
    localStorage.setItem('userdata', JSON.stringify({
        name: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        email: mail,
        phonenumber: ""
    }));
}

/*
Se le agrega un evento 'click' al boton de id="sesionIni", 
establece las constantes locales de usuario y contraseña 
y luego atravez de un if en el caso de que falten la contraseña o
el usuario, el boton sesionIni no responderá y se ejecutará una alerta, y en caso positivo
redireccionará a index.html y establecera en localStorage
authentificated con valor true
*/


