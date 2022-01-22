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
    document.getElementById('frame').classList.remove('frame-short');
    document.getElementById('frame').classList.remove('frame-middle');
    document.getElementById('frame').classList.remove('frame-long');
    document.getElementById('nav').classList.remove('nav-up');
    document.getElementById('form-signup').classList.remove('form-signup-down');
    document.getElementById('success').classList.remove('success-left');
    document.getElementById('form-signin').classList.remove('form-signin-left');
    document.getElementById('form-signup').classList.remove('form-signup-left');
    document.getElementById('logoForm').classList.remove('hidden');
    document.getElementById('loginNav').classList.add('hidden');
    document.getElementById('signup-inactive').classList.add('signup-inactive');
    document.getElementById('signup-inactive').classList.remove('signup-active');
    document.getElementById('signin-active').classList.remove('signin-inactive');
    let formup = document.getElementById('form-signup');
    formup.elements.username.value = '';
    formup.elements.email.value = '';
    formup.elements.password.value = '';
    let formin = document.getElementById('form-signin');
    formin.elements.username.value = '';
    formin.elements.password.value = '';
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
    setTimeout(checkOrder, 3000);
})

document.getElementById('btn-save').addEventListener('click', function() {
    const formName2 = document.getElementById('form-crud');
    const valid2 = false;
    const form = document.forms.saveForm;
    isValid(checkValid('form-crud'), form, formName2, valid2, true);
})

// Previous page 

document.getElementById('previous').addEventListener('click', function() {
    previousBtn();
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
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'You need to choose the car!',
            })
        }    
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'Please login to use our website!',
        })
    }
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

    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
