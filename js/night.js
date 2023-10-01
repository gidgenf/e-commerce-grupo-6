document.addEventListener('DOMContentLoaded', () => {
    let boxButton = document.getElementById('boxButton');
    let buttonValue = localStorage.getItem('buttonValue');

    function changes(value) {
      if (value === 'false') {
        boxButton.innerHTML = '<button class="btn btn-outline-dark" ><i class="fa-solid fa-sun"></i></button>';
        document.body.style.backgroundColor = 'rgb(49, 49, 49)';

        var cardTitles = document.getElementsByClassName('text');

        for (var i = 0; i < cardTitles.length; i++) {
          cardTitles[i].style.color = 'white';
        }
      } else {
        boxButton.innerHTML = '<button class="btn btn-outline-dark" ><i class="fa-solid fa-moon"></i></button>';
        document.body.style.backgroundColor = 'white';
        
        var cardTitles = document.getElementsByClassName('text');
        for (var i = 0; i < cardTitles.length; i++) {
          cardTitles[i].style.color = 'black';
        }
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
  