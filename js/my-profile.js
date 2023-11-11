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

window.addEventListener('load', () => {
    const base64ImageData = localStorage.getItem('imagenBase64');
    if (base64ImageData) {
        imageContainer.innerHTML = `<img src="${base64ImageData}" width="200" height="auto">`;
    }
});




(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()