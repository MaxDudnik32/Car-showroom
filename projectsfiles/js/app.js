const userData = checkLocal();

if(checkEntry() == true) {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('loginNav').classList.add('hidden');
    checkOrder();
}
showCar();
checkStatus();

// Form

document.getElementById('login').addEventListener('click', function() {
    document.getElementById('logoForm').classList.remove('hidden');
    document.getElementById('loginNav').classList.add('hidden');
    loadSignIn();
})

document.getElementById('btnin').addEventListener('click', function() {
    showSignInForm();
})

document.getElementById('btnup').addEventListener('click', function() {
    showSignForm();
})

document.getElementById('btn-signup').addEventListener('click', function() {
    const formName1 = document.getElementById('form-signup')
    const valid1 = true;
    const form = document.forms.upForm;
    isValid(checkValid('form-signup'), form, formName1, valid1, false);
})

document.getElementById('btn-signin').addEventListener('click', function() {
    checkLogin();
})

document.getElementById('btn-save').addEventListener('click', function() {
    const formName2 = document.getElementById('form-crud');
    const valid2 = false;
    const form = document.forms.saveForm;
    isValid(checkValid('form-crud'), form, formName2, valid2, true);
})

// Previous page 

document.getElementById('previous').addEventListener('click', function() {
    unhideElements();
    // Previous Btn
    document.getElementById('previous').classList.add('hidden');
    // Main-product
    document.getElementById('main-products').classList.remove('main-products');
    document.getElementById('main-products').classList.add('hidden');
    document.getElementById('info-car').classList.add('hidden');
    //Crud
    document.getElementById('crud').innerHTML = '';
})

// Car page

document.getElementById('carPage').addEventListener('click', function() {
    if(checkEntry() === true) {
        if(activeCar !== undefined) {
            document.getElementById('chose-car').classList.remove('hidden');
            document.getElementById('chose-car').classList.add('chose-car-flex');
            document.getElementById('header').classList.add('opacity');
            document.getElementById('main').classList.add('opacity');
            charCar();
        } else {
            alert("You need to choose the car!");
        }    
    } else {
        alert("Please login to use our website!");
    }
    // if(checkEntry() === true) {
    //     if(activeCar !== undefined) {
    //         hideElements();
    //         showProducts();
    //     } else {
    //         alert("You need to choose the car!");
    //     }
    // } else {
    //     alert("Please login to use our website!");
    // }
})

// Dropdown function

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if ((!event.target.matches('.dropbtn')) && (!event.target.matches('.dropbtntext'))) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

