const showCar = () => {
    for(let i = 0; i < cars.length; i++) {
        const logoParent = document.getElementById('logoCar');
        const carParent = document.getElementById('car');

        let carChild = document.createElement('img');
        carChild.src = 'images/cars/' + (i+1) + '.png';

        let logoChild = document.createElement('img');
        logoChild.classList.add('logoCarImg');
        logoChild.setAttribute('data-id', i);
        if(i === 0) {
            logoChild.src = 'images/logos/' + 'active' + (i+1) + '.png';
            carParent.appendChild(carChild);
            activeCar = 0;
        } else {
            logoChild.src = 'images/logos/' + (i+1) + '.png';
        }
        logoParent.appendChild(logoChild);

        let parentElement = document.querySelectorAll(`${('[data-id]')}`);

        parentElement[i].addEventListener('click', function() {
            let someElement = document.querySelectorAll(`${('[data-id]')}`);
            for(let j = 0; j < cars.length; j++) {
                if(i === j) {
                    someElement[j].src = 'images/logos/' + 'active' + (j+1) + '.png';
                    activeCar = i;
                } else {
                    someElement[j].src = 'images/logos/' + (j+1) + '.png';
                }
            }

            carParent.appendChild(carChild);

            while (carParent.firstChild) {
                carParent.removeChild(carParent.firstChild);
            }
            carParent.appendChild(carChild);
        })
    }
}

// Login animate

const showSignForm = () => {
    document.getElementById('form-signin').classList.add('form-signin-left');
    document.getElementById('form-signup').classList.add('form-signup-left');
    document.getElementById('frame').classList.add('frame-long');
    document.getElementById('signup-inactive').classList.remove('signup-inactive');
    document.getElementById('signup-inactive').classList.add('signup-active');
    document.getElementById('signin-active').classList.remove('signin-active');
    document.getElementById('signin-active').classList.add('signin-inactive');
}

const showSignInForm = () => {
    document.getElementById('form-signin').classList.remove('form-signin-left');
    document.getElementById('form-signup').classList.remove('form-signup-left');
    document.getElementById('frame').classList.remove('frame-long');
    document.getElementById('signup-inactive').classList.remove('signup-active');
    document.getElementById('signin-active').classList.remove('signin-inactive');
    document.getElementById('signup-inactive').classList.add('signup-inactive');
    document.getElementById('signin-active').classList.add('signin-active');
    document.getElementById('forgot').classList.remove('forgot-left');
}

const loadSignIn = () => {
    document.getElementById('btn-animate').classList.remove('btn-animate-grow');
    document.getElementById('welcome').classList.remove('welcome-left');
    document.getElementById('profile-photo').classList.remove('profile-photo-down');
    document.getElementById('frame').classList.remove('frame-middle');
    setTimeout(() => document.getElementById('logoForm').classList.remove('hidden'), 3000);
}

const showSignUp = (valid, form) => {
    if(valid) {
        document.getElementById('nav').classList.toggle('nav-up');
        document.getElementById('form-signup').classList.toggle('form-signup-down'); 
        document.getElementById('success').classList.toggle('success-left');
        document.getElementById('frame').classList.add('frame-short');
        setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
        document.getElementById('mainMenu').classList.remove('hidden');
    } else {
        form.classList.add('hidden')
        document.getElementById('successsave').classList.toggle('success-left');
        document.getElementById('crudframe').classList.remove('framecrud');
        document.getElementById('crudframe').classList.add('frame-short');
        setTimeout(() => form.classList.add('hidden'), 3000);
    }
}

const showSave = (form) => {
    form.classList.add('hidden');
    // document.getElementById('nav').classList.add('nav-up');
    document.getElementById('form-crud').classList.remove('form-signin');
    document.getElementById('form-crud').classList.add('form-signup-down'); 
    document.getElementById('successsave').classList.add('success-left');
    //document.getElementById('frame').classList.add('frame-long');
    document.getElementById('crudframe').classList.remove('framecrud');
    document.getElementById('crudframe').classList.add('frame-short');
    setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
    document.getElementById('mainMenu').classList.remove('hidden');
}

const showSignIn = () => {
    document.getElementById('btn-animate').classList.add('btn-animate-grow');
    document.getElementById('welcome').classList.add('welcome-left');
    document.getElementById('profile-photo').classList.add('profile-photo-down');
    document.getElementById('frame').classList.add('frame-middle');
    setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
    document.getElementById('mainMenu').classList.remove('hidden');
}

// DropDown

const quit = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to leave from account!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, quit!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Congrat!',
                'Your have quited!',
                'success'
            )
            localStorage.removeItem('loginpers', JSON.stringify([]));
            document.getElementById('mainMenu').classList.add('hidden');
            document.getElementById('loginNav').classList.remove('hidden');
            previousBtn();
        } else {
            Swal.fire('You are still here!');
        }
    })
}

const changePost = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to change the status!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Congrat!',
                'Your have changed the status',
                'success'
            )
            previousBtn();
            let change = document.getElementById('changePost');
            let post = JSON.parse(localStorage.getItem('loginpers')).postlog;
            let index = JSON.parse(localStorage.getItem('loginpers'));
            if(post == false) {
                index.postlog = true;
                change.innerHTML = 'Be manager';
            } else {
                index.postlog = false;
                change.innerHTML = 'Be user';
            }
            localStorage.setItem('loginpers', JSON.stringify(index));
        } else {
            Swal.fire('You are still here!');
        }
    })
}

const checkStatus = () => {
    let change = document.getElementById('changePost');
    let post;
    if(JSON.parse(localStorage.getItem('loginpers'))) {
        post = JSON.parse(localStorage.getItem('loginpers')).postlog;
    }
    if(post == false) {
        change.innerHTML = 'Be user';
    } else {
        change.innerHTML = 'Be manager';
    }
}

// Character car 

const charCar = () => {
    const charParent = document.getElementById('chose-car');
    charParent.innerHTML = `
    <div id="close-btn" class="close">
        <i class="fas fa-times"></i>
    </div>
    `;

    document.getElementById('close-btn').addEventListener('click', function() {
        charParent.classList.add('hidden');
        charParent.classList.remove('chose-car-flex');
        document.getElementById('header').classList.remove('opacity');
        document.getElementById('main').classList.remove('opacity');
    })

    const charCarWrap = document.createElement('div');
    charCarWrap.classList.add('char-car-wrapper');
    charParent.appendChild(charCarWrap);

    const carElement = document.createElement('img');
    carElement.src = 'images/cars/' + (activeCar+1) + '.png';
    carElement.classList.add('charElements');
    charCarWrap.appendChild(carElement);

    const carInfoBtn = document.createElement('a');
    carInfoBtn.classList.add('get-info');
    carInfoBtn.innerHTML = 'Get more info';
    carInfoBtn.addEventListener('click', function() {
        charParent.classList.add('hidden');
        charParent.classList.remove('chose-car-flex');
        document.getElementById('header').classList.remove('opacity');
        document.getElementById('main').classList.remove('opacity');
        hideElements();
        showProductInfo(true);
        showProductsDetails(activeCar, 0);
        document.getElementById('selected-parents').innerHTML = "";
        if(checkManager() === true) {
            showUsersToSelect();
        }
        document.getElementById('back-wrapper').classList.remove('hidden')
    })
    charCarWrap.appendChild(carInfoBtn);

    const charMotorWrap = document.createElement('div');
    charMotorWrap.classList.add('char-car-wrapper');
    charParent.appendChild(charMotorWrap);

    const motorElement = document.createElement('img');
    motorElement.src = 'images/details1/1.png';
    motorElement.classList.add('charElements');
    motorElement.classList.add('motor-detail');
    charMotorWrap.appendChild(motorElement);

    const motorInfoBtn = document.createElement('a');
    motorInfoBtn.classList.add('get-info');
    motorInfoBtn.innerHTML = 'Get more info';
    motorInfoBtn.addEventListener('click', function() {
        charParent.classList.add('hidden');
        charParent.classList.remove('chose-car-flex');
        document.getElementById('header').classList.remove('opacity');
        document.getElementById('main').classList.remove('opacity');
        hideElements();
        showProductInfo(false);
        showProductsDetails(activeCar, 1);
        document.getElementById('selected-parents').innerHTML = "";
        if(checkManager() === true) {
            showUsersToSelect();
        }
        document.getElementById('back-wrapper').classList.remove('hidden')
    })
    charMotorWrap.appendChild(motorInfoBtn);
}