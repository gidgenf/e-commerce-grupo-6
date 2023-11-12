document.addEventListener('DOMContentLoaded', () => {
    let userdata = JSON.parse(localStorage.getItem('userdata'));

    console.log(userdata);
    setInputValues(userdata);
    setProfileImage(userdata);

});

function setInputValues(array) {
    document.getElementById('username').value = array.name;
    document.getElementById('secondname').value = array.secondname;
    document.getElementById('lastname').value = array.lastname;
    document.getElementById('secondlastname').value = array.secondlastname;
    document.getElementById('email').value = array.email;
    document.getElementById('phonenumber').value = array.phonenumber;
}

function setProfileImage(userdata) {
    const base64ImageData = userdata ? userdata.image : '';
    if (base64ImageData) {
        imageContainer1.innerHTML = `<img src="${base64ImageData}" width="200" height="auto">`;
    }
}

function getInputValuesAndStorage() {
    let usernameInput = document.getElementById('username').value;
    let secondnameInput = document.getElementById('secondname').value;
    let lastnameInput = document.getElementById('lastname').value;
    let secondlastnameInput = document.getElementById('secondlastname').value;
    let emailInput = document.getElementById('email').value;
    let phonenumberInput = document.getElementById('phonenumber').value;

    const base64ImageData = localStorage.getItem('imagenBase64') || '';

    localStorage.setItem('userdata', JSON.stringify({
        name: usernameInput,
        secondname: secondnameInput,
        lastname: lastnameInput,
        secondlastname: secondlastnameInput,
        email: emailInput,
        phonenumber: phonenumberInput,
        image: base64ImageData
    }));
}

const fileInput = document.getElementById('fileInput');
const saveButton = document.getElementById('saveButton');
const imageContainer = document.getElementById('imageContainer');

fileInput.addEventListener('change', () => {
    const selectedFile = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const base64ImageData = event.target.result;
        imageContainer.innerHTML = `<img src="${base64ImageData}" width="200" height="auto">`;
    };

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
});

saveButton.addEventListener('click', () => {
    const base64ImageData = imageContainer.querySelector('img').src;

    if (base64ImageData) {
        localStorage.setItem('imagenBase64', base64ImageData);
        alert('Imagen guardada en el Local Storage.');
    } else {
        alert('Primero selecciona una imagen antes de guardar.');
    }
});

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            getInputValuesAndStorage()
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()