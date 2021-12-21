// Initialization

let mainId;
let userDatLog;
let activeCar;

// Load

const checkLocal = () => {
    if(localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return [];
    }
}

// Drop down

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
    }
}

const checkStatus = () => {
    let change = document.getElementById('changePost');
    let post = JSON.parse(localStorage.getItem('loginpers')).postlog;
    if(post == false) {
        change.innerHTML = 'Be user';
    } else {
        change.innerHTML = 'Be manager';
    }
}

// Show Crud

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

// Dynamic car

const showProducts = () => {
    const main = document.getElementById('main');

    const productParent = document.createElement('div');
    productParent.setAttribute('id', 'main-products');
    // id

    const imgParents = document.createElement('div');
    imgParents.setAttribute('id', 'car-elements');

    const choseElement = document.createElement('img');
    choseElement.src = 'images/cars/' + (activeCar+1) + '.png';
    choseElement.addEventListener('click', function() {
        console.log(activeCar);
        showProductsDetails(activeCar);
    })

    const buyParent = document.createElement('div');
    buyParent.setAttribute('id', 'buy-parent')
    // id

    main.appendChild(productParent);
    productParent.appendChild(imgParents);
    imgParents.appendChild(choseElement);
    productParent.appendChild(buyParent);

    // for(let i = 0; i < cars.length; i++) {
    //     const choseElement = document.createElement('div')
    // }
}

const showProductsDetails = (carIndex) => {
    // alert('AHAHA');
    const product = cars[carIndex];

    const wrapper = document.getElementById('buy-parent');
    wrapper.innerHTML = "";

    const nameElement = document.createElement('div');
    nameElement.innerHTML = product.mark;
    wrapper.appendChild(nameElement);
    
    // const priceElement = document.createElement('div');
    // priceElement.textContent = '$' + product.price;
    // wrapper.appendChild(priceElement);

    // const countInfo = document.createElement('div');
    // countInfo.textContent = 'Count of the selected item: ' + product.count;
    // wrapper.appendChild(countInfo);

    // const countElement = document.createElement('input');
    // countElement.setAttribute('type', 'text');
    // countElement.setAttribute('id', 'count');
    // wrapper.appendChild(countElement);

    // const buyElement = document.createElement('input');
    // buyElement.setAttribute('type', 'button');
    // buyElement.setAttribute('value', 'Buy');
    // buyElement.addEventListener('click', function() {
    //     showNotification(categoryIndex, productIndex);
    // })
    // buyElement.addEventListener('click', function() {
    //     document.getElementById('form').classList.remove('hidden');
    // })
    // wrapper.appendChild(buyElement);
}

// Main page car

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

// Login Sign Up Form

const showSignForm = () => {
    document.getElementById('form-signin').classList.add('form-signin-left');
    document.getElementById('form-signup').classList.add('form-signup-left');
    document.getElementById('frame').classList.add('frame-long');
    document.getElementById('signup-inactive').classList.remove('signup-inactive');
    document.getElementById('signup-inactive').classList.add('signup-active');
    document.getElementById('signin-active').classList.add('signin-inactive');
    document.getElementById('forgot').classList.add('forgot-left');
    //this.classList.remove("idle").classList.add("active");
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
    //this.classList.remove("idle").classList.add("active");
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

    // document.getElementById('nav').classList.toggle('nav-up');
    // document.getElementById('form-signup').classList.toggle('form-signup-down'); 
    // document.getElementById('success').classList.toggle('success-left');
    // //document.getElementById('frame').classList.add('frame-long');
    // document.getElementById('frame').classList.add('frame-short');
    // setTimeout(() => document.getElementById('logoForm').classList.add('hidden'), 3000);
    // document.getElementById('mainMenu').classList.remove('hidden');
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

function isValid(validation, form, formName, valid, checkCrud) {
    if(validation) {
        const savePersonForm = form.elements;

        const userDat = {
            name: savePersonForm.username.value,
            password: savePersonForm.password.value,
            email: savePersonForm.email.value,
            post: true,
        }

        if((isValidName(userDat.name)) && (isValidPassword(userDat.password)) && (isValidEmail(userDat.email))) {
            savePerson(userDat, checkCrud);
            if(checkCrud) {
                alert("Succes editings");
                formName.classList.add('hidden');
                document.getElementById('crudframe').classList.add('hidden');
                // console.log("success")
                // showSave(formName);
            } else {
                showSignUp(valid, formName);
            }
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

// Regular Validation

function isValidName(name) {
    return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,})$/.test(name);
}

function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

function isValidEmail(email) {
    return /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/.test(email);
}

const savePerson = (user, checkCrud) => {
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
        if(checkCrud) {
            while(myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            showUsers();
        }
    }
}

const checkLogin = () => {
    const savePersonForm = document.forms.inForm.elements;
    let check = false;

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
            showSignIn();
            localStorage.setItem('loginpers', JSON.stringify(userDatLog))
            // localStorage.setItem('login', JSON.stringify(true));
            document.getElementById('welcome').innerHTML = 'Welcome, ' + userDatLog.nameLog;
            check = true;
        }
    }
    if(!check) {
        alert("Your login/password are wrong!");
    }
}

// CRUD 

function showUsers(){
    // let previous = document.createElement('a');
    // previous.classList.add('previous');
    // previous.innerHTML = `&#8249;`;

    let parentCrud = document.getElementById('crud');

    parentCrud.appendChild(previous);
    if(parentCrud === null){
        parentCrud = document.createElement('div')
        parentCrud.setAttribute('id', 'crud') 
        // document.querySelector('body').appendChild(parentCrud)
        document.getElementById('main').appendChild(parentCrud);
    }

    for(let i=0; i<userData.length; i++){
        const wrapper = document.createElement('div')
        wrapper.setAttribute('data-id', i)
        wrapper.classList.add('user')

        let personImg = document.createElement('img')
        personImg.classList.add('image')
        personImg.src='images/unknown.jpg'

        let personName = document.createElement('div')
        personName.innerHTML = `${userData[i].name}`

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
            info.innerHTML = `${userData[i].name} ${userData[i].age} years old`
            parentCrud.appendChild(info)
        })

        let remove = document.createElement('input')
        remove.setAttribute('type', 'button')
        remove.setAttribute('value', 'remove')
        remove.addEventListener('click', function(){
            if(confirm('Do you want delete this person?')){
                const id = wrapper.getAttribute('data-id')
                parentCrud.remove(wrapper)
                userData.splice(id, 1)
                localStorage.setItem('users',JSON.stringify(userData))
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
            document.getElementById('editform').innerHTML = `Edit form of ${userData[i].name}`;
            form.elements.username.value = userData[i].name;
            form.elements.email.value = userData[i].email;
            form.elements.password.value = userData[i].password;
        })


        wrapper.appendChild(btnparent);
        btnparent.appendChild(view);
        btnparent.appendChild(remove);
        btnparent.appendChild(edit);
}