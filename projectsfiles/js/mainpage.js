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