let mainId;
let userDatLog;
let activeCar;

const checkLocal = () => {
    if(localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return [];
    }
}

const checkEntry = () => {
    return JSON.parse(localStorage.getItem('loginpers')).entry;
}

const quit = () => {
    if(confirm("Are you sure to quit form account?")) {
        let quit = [];
        // localStorage.setItem('login', JSON.stringify(false));
        localStorage.setItem('loginpers', JSON.stringify(quit));
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('loginNav').classList.remove('hidden');
    }
}

const changePost = () => {
    if(confirm("Are you to change a status?")) {
        let post = JSON.parse(localStorage.getItem('loginpers')).postlog;
        let index = JSON.parse(localStorage.getItem('loginpers'));
        if(post == true) {
            index.postlog = false;
        } else {
            index.postlog = true;
        }
        localStorage.setItem('loginpers', JSON.stringify(index));
    }
}

const hideElements = () => {
    const main = document.getElementById('mainCar');
    const mainBtn = document.getElementById('carPage');
    main.classList.remove('mainCar');
    main.classList.add('hidden');
    mainBtn.classList.remove('carPage');
    mainBtn.classList.add('hidden');
}

const showCRUD = () => {
    hideElements();
    showUsers();
}

const showProducts = () => {
    console.log('alert')

    const main = document.getElementById('main');

    const productParent = document.createElement('div');
    // id

    const choseElement = document.createElement('img');
    choseElement.src = 'images/cars/' + (activeCar+1) + '.png';

    main.appendChild(productParent);
    productParent.appendChild(choseElement);

    // for(let i = 0; i < cars.length; i++) {
    //     const choseElement = document.createElement('div')
    // }
}

const showCar = () => {
    for(let i = 0; i < cars.length; i++) {
        const logoParent = document.getElementById('logoCar');
        const carParent = document.getElementById('car');

        let logoChild = document.createElement('img');
        logoChild.classList.add('logoCarImg');
        logoChild.setAttribute('data-id', i);
        logoChild.src = 'images/logos/' + (i+1) + '.png';
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

            let parentElement = document.querySelectorAll(`${('[data-id]')}`);
        })

        let carChild = document.createElement('img');
        carChild.src = 'images/cars/' + (i+1) + '.png';
    }
}

const showSignForm = () => {
    document.getElementById('form-signin').classList.toggle('form-signin-left');
    document.getElementById('form-signup').classList.toggle('form-signup-left');
    document.getElementById('frame').classList.toggle('frame-long');
    document.getElementById('signup-inactive').classList.toggle('signup-active');
    document.getElementById('signin-active').classList.toggle('signin-inactive');
    document.getElementById('forgot').classList.toggle('forgot-left');
    //this.classList.remove("idle").classList.add("active");
}

const showSignUp = (valid, form) => {
    if(valid) {
        document.getElementById('nav').classList.toggle('nav-up');
        document.getElementById('form-signup').classList.toggle('form-signup-down'); 
        document.getElementById('success').classList.toggle('success-left');
        //document.getElementById('frame').classList.add('frame-long');
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

const showSignIn = () => {
    document.getElementById('btn-animate').classList.add('btn-animate-grow');
    document.getElementById('welcome').classList.add('welcome-left');
    document.getElementById('profile-photo').classList.add('profile-photo-down');
    document.getElementById('frame').classList.add('frame-middle');
    setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
    document.getElementById('mainMenu').classList.remove('hidden');
}

// CheckValid

function checkValid(formid) {
    let formThings = document.getElementById(formid).elements;
    let isValidCounter = 0;
    let generalCounter = 0;
    let validation;

    for(let i = 0; i < formThings.length; i++) {
        if(formThings[i].nodeName == 'INPUT') {
            generalCounter++
            if(formThings[i].value) {
                isValidCounter++
            }
        }
    }
    if(isValidCounter === generalCounter) {
        validation = true;
    }
    return validation;
}

function isValid(validation, form, formName, valid) {
    if(validation) {
        const savePersonForm = form.elements;

        const userDat = {
            name: savePersonForm.username.value,
            password: savePersonForm.password.value,
            email: savePersonForm.email.value,
            post: true,
        }

        // console.log(savePersonForm.username.value);

        // console.log(userDat.password === savePersonForm.confirmpassword.value);

        if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email))) {
            savePerson(userDat);
            showSignUp(valid, formName);
        } else if (!isValidName(userDat.name)) {
            alert("You entered the wrong name");
        } else if (!isValidEmail(userDat.email)) {
            alert("Your email is incorrect");
        } else if (!isValidPassword(userDat.password)) {
            alert("In password you need more than 8 elements and one number!");
        } else {
            alert("You passwords arent correct");
        }

        // saveValid(userDat);
        
    } else {
        alert('You provided incomplete information');
    }
}

// const saveValid = (userDat) => {
//     if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email))) {
//         showSignUp();
//         savePerson(userDat);
//     } else if (!isValidName(userDat.name)) {
//         alert("You entered the wrong name");
//     } else if (!isValidEmail(userDat.email)) {
//         alert("Your email is incorrect");
//     } else if (!isValidPassword(userDat.password)) {
//         alert("In password you need more than 8 elements and one number!");
//     } else {
//         alert("You passwords arent correct");
//     }
// }

// const infoValid = () => {
//     if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email)) && ((userDat.password === savePersonForm.confirmpassword.value))) {
//         showSignUp();
//         savePerson(userDat);
//     } else if (!isValidName(userDat.name)) {
//         alert("You entered the wrong name");
//     } else if (!isValidEmail(userDat.email)) {
//         alert("Your email is incorrect");
//     } else if (!isValidPassword(userDat.password)) {
//         alert("In password you need more than 8 elements and one number!");
//     } else {
//         alert("You passwords arent correct");
//     }
// }

function isValidName(name) {
    return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,})$/.test(name);
}

function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function isValidEmail(email) {
    return /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/.test(email);
}

const savePerson = (user) => {
    let myNode = document.getElementById('crud');
    if(mainId <= userData.length) {
        userData[mainId] = user;
        localStorage.setItem('users', JSON.stringify(userData));
        while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        showUsers();
    } else {
        userData.push(user);
        localStorage.setItem('users', JSON.stringify(userData));
        // localStorage.setItem('login', JSON.stringify(true));
        while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        showUsers();
    }

    //

    // userData.push(user);
    // localStorage.setItem('users', JSON.stringify(userData));
}

const checkLogin = () => {
    const savePersonForm = document.forms.inForm.elements;

    userDatLog = {
        nameLog: savePersonForm.username.value,
        passwordLog: savePersonForm.password.value,
        postlog: true,
        entry: true,
    }

    usersInfo = JSON.parse(localStorage.getItem('users'));

    for(let i = 0; i < usersInfo.length; i++) {
        if((usersInfo[i].name === userDatLog.nameLog) && (usersInfo[i].password === userDatLog.passwordLog)) {
            // userDatLog.postlog = usersInfo[i].post;
            // console.log(userDatLog.postlog);
            // console.log(usersInfo[i]);
            showSignIn();
            localStorage.setItem('loginpers', JSON.stringify(userDatLog))
            // localStorage.setItem('login', JSON.stringify(true));
            document.getElementById('welcome').innerHTML = 'Welcome, ' + userDatLog.nameLog;
        }
    }
}

// CRUD 

function showUsers(){
    let parentCrud = document.getElementById('crud');

    if(parentCrud === null){
        parentCrud = document.createElement('div')
        parentCrud.setAttribute('id', 'crud') 
        // document.querySelector('body').appendChild(parentCrud)
        document.getElementById('main').appendChild(parentCrud);
    }
    for(let i=0; i<users.length; i++){
        const wrapper = document.createElement('div')
        wrapper.setAttribute('data-id', i)
        wrapper.classList.add('user')

        let personImg = document.createElement('img')
        personImg.classList.add('image')
        personImg.src='images/unknown.jpg'

        let personName = document.createElement('div')
        personName.innerHTML = `${users[i].name}`

        parentCrud.appendChild(wrapper);
        wrapper.appendChild(personImg);
        wrapper.appendChild(personName);
        if(!JSON.parse(localStorage.getItem('loginpers')).postlog) {
            showBtn(wrapper, i, parentCrud);
        }
    }
}

function showBtn(wrapper, i, parentCrud){
    let btnparent = document.createElement('div');
        btnparent.classList.add('button')

        let view = document.createElement('input')
        view.setAttribute('type', 'button')
        view.setAttribute('value', 'view')
        view.addEventListener('click', function(){
            let info = document.createElement('div')
            info.innerHTML = `${users[i].name} ${users[i].age} years old`
            parentCrud.appendChild(info)
        })

        let remove = document.createElement('input')
        remove.setAttribute('type', 'button')
        remove.setAttribute('value', 'remove')
        remove.addEventListener('click', function(){
            if(confirm('Do you want delete this person?')){
                const id = wrapper.getAttribute('data-id')
                parentCrud.remove(wrapper)
                users.splice(id, 1)
                localStorage.setItem('users',JSON.stringify(users))
                showUsers();
            }
        })

        let edit = document.createElement('input');
        edit.setAttribute('type', 'button');
        edit.setAttribute('value', 'edit');
        edit.addEventListener('click', function(){
            let form = document.getElementById('form-crud');
            document.getElementById('crudframe').classList.add('framecrud');
            document.getElementById('crudframe').classList.remove('hidden');
            form.classList.remove('hidden');
            mainId = wrapper.getAttribute('data-id');
            document.getElementById('editform').innerHTML = `Edit form of ${users[i].name}`;
            form.elements.username.value = users[i].name;
            form.elements.email.value = users[i].email;
            form.elements.password.value = users[i].password;
        })


        wrapper.appendChild(btnparent);
        btnparent.appendChild(view);
        btnparent.appendChild(remove);
        btnparent.appendChild(edit);
}