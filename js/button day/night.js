document.addEventListener('DOMContentLoaded',()=>{
let boxButton = document.getElementById('boxButton');
let buttonValue = true;
function changes(){
    if(buttonValue){
     boxButton.innerHTML ='<i class="fa-solid fa-moon"></i>'
    }
    boxButton.innerHTML ='<i class="fa-solid fa-sun"></i>'
}
changes()
});