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

function saveEmail(mail) { //se guarda el email ingresado en el local storage junto con otros datos
    
    localStorage.setItem('userdata', JSON.stringify({
        name: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        email: mail,
        phonenumber: ""
    }));
}



