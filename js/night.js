document.addEventListener('DOMContentLoaded', () => {
    let boxButton = document.getElementById('boxButton');
    let buttonValue = localStorage.getItem('buttonValue');
    let text = document.querySelector('.text')

    function changes(value) {
      if (value === 'false') {
        boxButton.innerHTML = '<button class="btn noneborder btn-outline-dark  btn-lg" ><i class="fa-solid fa-sun"></i></button>';
       document.body.style.backgroundColor = 'rgb(49, 49, 49)';
       text.style.color = 'white'
      } else {
        boxButton.innerHTML = '<button class="btn noneborder btn-outline-dark  btn-lg" ><i class="fa-solid fa-moon"></i></button>';
        document.body.style.backgroundColor = 'white';
        text.style.color = 'black';
      }
    }
  
    boxButton.addEventListener('click', () => {
      if (buttonValue !== 'false') {
        localStorage.setItem('buttonValue', 'false'); 
        buttonValue = 'false'; 
        changes(buttonValue);
      } else {
        localStorage.removeItem('buttonValue');
        buttonValue = null;
        changes(buttonValue);
      }
    });
  
    changes(buttonValue);
  });
  