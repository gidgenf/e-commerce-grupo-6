document.addEventListener('DOMContentLoaded', () => {
  let boxButton = document.getElementById('boxButton');
  let buttonValue = localStorage.getItem('buttonValue');

  function changes(value) {
    if (value === 'false') {
      boxButton.innerHTML = '<button class="btn btn-outline-dark" ><i class="fa-solid fa-sun"> Dia / Noche</i></button>';
      document.body.style.backgroundColor = 'rgb(49, 49, 49)';

      var cardTitles = document.getElementsByClassName('text');
      var cardContainerBg = document.getElementsByClassName('bgtext')

      for (var i = 0; i < cardTitles.length; i++) {
        cardTitles[i].style.color = 'white';
      }

       for (var i = 0; i < cardContainerBg.length; i++) {
        cardContainerBg[i].style.backgroundColor = 'rgb(49, 49, 49)';
      }

    } else {
      boxButton.innerHTML = '<button class="btn btn-outline-dark" ><i class="fa-solid fa-moon"> Dia / Noche</i></button>';
      document.body.style.backgroundColor = 'white';

      var cardTitles = document.getElementsByClassName('text');
      var cardContainerBg = document.getElementsByClassName('bgtext')


      for (var i = 0; i < cardTitles.length; i++) {
        cardTitles[i].style.color = 'black';
      }

      for (var i = 0; i < cardContainerBg.length; i++) {
        cardContainerBg[i].style.backgroundColor = 'white';
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
