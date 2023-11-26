const url = 'http://localhost:3000/login';

const login = document.querySelector('#sesionIni');

login.addEventListener('click', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!isValidEmail(username)) {
        window.alert("Ingrese un Email valido");
        return;
    }

    if (!password || !username) {
        window.alert("¡Debes completar los campos vacíos!");
        return;
    }

    saveEmail(username);

    const data = {
        username: username,
        password: password
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                alert(data.token);
                localStorage.setItem('access-token', data.token);
                console.log('Token almacenado en localStorage:', data.token);
                window.location.href = '/index.html';
            } else {
                throw new Error('Token no recibido');
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
        });

    function isValidEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);
    }

    function saveEmail(mail) {
        localStorage.setItem('userdata', JSON.stringify({
            name: "",
            secondname: "",
            lastname: "",
            secondlastname: "",
            email: mail,
            phonenumber: ""
        }));
    }
});
