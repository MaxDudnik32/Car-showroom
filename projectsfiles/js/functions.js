// Initialization

let mainId;
let userDatLog;
let activeCar;

// Load

const checkOrder = () => {
    const checkOrder = JSON.parse(localStorage.getItem('users'));
    const orderPers = JSON.parse(localStorage.getItem('loginpers'));
    for(let i = 0; i < checkOrder.length; i++) {
        if(checkOrder[i].name === orderPers.nameLog) {
            if(checkOrder[i].order) {
                orderMessage(checkOrder[i].order);
            }
        }
    }
}

const checkLocal = () => {
    if(localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return [];
    }
}

const orderMessage = (order) => {
    const orderParent = document.getElementById('chose-car');
    orderParent.innerHTML = "";
    orderParent.classList.remove('hidden');

    const orderText = document.createElement('div');
    if(order.length > 1) {
        orderText.innerHTML = 'You achived ' + order.length + ' orders!';
    } else {
        orderText.innerHTML = 'You achived ' + order.length + ' order!';
    }
    orderParent.appendChild(orderText);

    console.log(order)

    // const orderCarWrap = document.createElement('div');
    // orderCarWrap.classList.add('char-car-wrapper');
    // orderParent.appendChild(orderCarWrap);

    // const orderElement = document.createElement('img');
    // orderElement.src = 'images/cars/' + 1 + '.png';
    // orderElement.classList.add('charElements');
    // orderCarWrap.appendChild(orderElement);

    // const carInfoBtn = document.createElement('a');
    // carInfoBtn.classList.add('get-info');
    // carInfoBtn.innerHTML = 'Get more info';
    // carInfoBtn.addEventListener('click', function() {
    //     charParent.classList.add('hidden');
    //     charParent.classList.remove('chose-car-flex');
    //     document.getElementById('header').classList.remove('opacity');
    //     document.getElementById('main').classList.remove('opacity');
    //     hideElements();
    //     showProductInfo(true);
    //     showProductsDetails(1, 0);
    //     document.getElementById('selected-parents').innerHTML = "";
    //     if(checkManager() === true) {
    //         showUsersToSelect();
    //     }
    //     document.getElementById('previous').classList.remove('hidden')
    // })
    // charCarWrap.appendChild(carInfoBtn);

    // const charMotorWrap = document.createElement('div');
    // charMotorWrap.classList.add('char-car-wrapper');
    // charParent.appendChild(charMotorWrap);

    // const motorElement = document.createElement('img');
    // motorElement.src = 'images/details1/1.png';
    // motorElement.classList.add('charElements');
    // motorElement.classList.add('motor-detail');
    // charMotorWrap.appendChild(motorElement);

    // const motorInfoBtn = document.createElement('a');
    // motorInfoBtn.classList.add('get-info');
    // motorInfoBtn.innerHTML = 'Get more info';
    // motorInfoBtn.addEventListener('click', function() {
    //     charParent.classList.add('hidden');
    //     charParent.classList.remove('chose-car-flex');
    //     document.getElementById('header').classList.remove('opacity');
    //     document.getElementById('main').classList.remove('opacity');
    //     hideElements();
    //     showProductInfo(false);
    //     showProductsDetails(1, 1);
    //     document.getElementById('selected-parents').innerHTML = "";
    //     if(checkManager() === true) {
    //         showUsersToSelect();
    //     }
    //     document.getElementById('previous').classList.remove('hidden')
    // })
    // charMotorWrap.appendChild(motorInfoBtn);
}

// Drop down

const checkEntry = () => {
    if(JSON.parse(localStorage.getItem('loginpers'))) {
        return true;
    } else {
        return false;
    }
}

const checkManager = () => {
    return JSON.parse(localStorage.getItem('loginpers')).postlog;
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

// Show Crud

const hideElements = () => {
    const main = document.getElementById('mainCar');
    const mainBtn = document.getElementById('carPage');
    main.classList.remove('mainCar');
    main.classList.add('hidden');
    mainBtn.classList.remove('carPage');
    mainBtn.classList.add('hidden');
}

const unhideElements = () => {
    const main = document.getElementById('mainCar');
    const mainBtn = document.getElementById('carPage');
    main.classList.add('mainCar');
    main.classList.remove('hidden');
    mainBtn.classList.add('carPage');
    mainBtn.classList.remove('hidden');
}

const showCRUD = () => {
    hideElements();
    showUsers();
}

// Character car 

const charCar = () => {
    const charParent = document.getElementById('chose-car');
    charParent.innerHTML = "";

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
        document.getElementById('previous').classList.remove('hidden')
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
        document.getElementById('previous').classList.remove('hidden')
    })
    charMotorWrap.appendChild(motorInfoBtn);
}

// Dynamic car

const showProductInfo = (checkInfo) => {
    const main = document.getElementById('main');

    const productParent = document.getElementById('main-products');
    productParent.classList.add('main-products');
    productParent.innerHTML = "";

    const imgParents = document.createElement('div');
    imgParents.setAttribute('id', 'car-elements');
    imgParents.classList.add('car-elements');

    const infoCar = document.getElementById('info-car');

    if(checkInfo) {
        const choseElement = document.createElement('img');
        choseElement.src = 'images/cars/' + (activeCar+1) + '.png';
        imgParents.appendChild(choseElement);
        infoCar.innerHTML = cars[activeCar].mark + " car " + cars[activeCar].details[0].name;
    } else { 
        const motorChoseElement = document.createElement('img');
        motorChoseElement.src = 'images/details1/1.png';
        imgParents.appendChild(motorChoseElement);
        infoCar.innerHTML = cars[activeCar].mark + " car " + cars[activeCar].details[1].name + " detail";
    }

    const buyParent = document.createElement('div');
    buyParent.setAttribute('id', 'buy-parent');

    const checkParents = document.createElement('div');
    checkParents.setAttribute('id', 'selected-parents');

    
    productParent.appendChild(imgParents);
    productParent.appendChild(buyParent);
    productParent.appendChild(checkParents);
}

const showProductsDetails = (carIndex, elementToBuy) => {
    const product = cars[carIndex];
    const choseCarElement = product.details[elementToBuy];

    const wrapper = document.getElementById('buy-parent');
    wrapper.classList.remove('hidden');
    wrapper.innerHTML = "";

    const nameElement = document.createElement('div');
    nameElement.innerHTML = product.mark + " " + choseCarElement.name;
    wrapper.appendChild(nameElement);

    const priceElement = document.createElement('div');
    priceElement.innerHTML = "The price of this item is: " + choseCarElement.price + "$";
    wrapper.appendChild(priceElement);

    const amountElement = document.createElement('div');
    amountElement.innerHTML = "The amount of this item is: " + choseCarElement.count + " items";
    wrapper.appendChild(amountElement);

    if(checkManager() === true) {
        const buyAmount = document.createElement('input');
        buyAmount.setAttribute('type', 'text');
        buyAmount.setAttribute('id', 'example');
        wrapper.appendChild(buyAmount);
    }

    if(checkManager() === true) {
        const buyButton = document.createElement('input');
        buyButton.setAttribute('type', 'button');
        buyButton.setAttribute('value', 'Buy');
        buyButton.setAttribute('id', 'buyButton');
        buyButton.addEventListener('click', function() {
            const radioBtn = document.querySelectorAll('[name*="radio"]');
            let radioCheck = false;
            let selectedPerson;
            for(let i in radioBtn) {
                if(radioBtn[i].checked) {
                    radioCheck = true;
                    selectedPerson = i;
                }    
            }
            if(document.getElementById('example').value > choseCarElement.count) {
                // alert('Congrat');
                alert('You have choosen to much items');
            } else if(radioCheck != true) {
                alert('You need to choose user!');
            } else {
                showBuyInfo(product, choseCarElement, selectedPerson);
            }
        })
        wrapper.appendChild(buyButton);
    }
}

const showUsersToSelect = () => {
    const checkParentss = document.getElementById('selected-parents');

    checkParentss.classList.remove('hidden');
    checkParentss.classList.add('selected-parents');

    let parentUsersToSelect = document.getElementById('main-products');
    parentUsersToSelect.appendChild(checkParentss);

    let sellUserInfo = document.createElement('div');
    if(JSON.parse(localStorage.getItem('loginpers')).postlog) {
        sellUserInfo.innerHTML = "Choose person from whom you want to buy it" ;
    } else {
        sellUserInfo.innerHTML = "Choose person to whom you want to sell it";
    }
    checkParentss.appendChild(sellUserInfo);

    for(let i=0; i<userData.length; i++){
        if(JSON.parse(localStorage.getItem('users'))[i].name !== JSON.parse(localStorage.getItem('loginpers')).nameLog) {
            const wrapper = document.createElement('div')
            wrapper.setAttribute('data-id', i)
            wrapper.classList.add('user')

            let personName = document.createElement('div')
            personName.innerHTML = `${userData[i].name}`

            let checkparent = document.createElement('div');
            checkparent.setAttribute('data-btn', i);
            wrapper.appendChild(checkparent);

            checkParentss.appendChild(wrapper);
            wrapper.appendChild(personName);

            const check = document.createElement('input');
            check.setAttribute('type', 'radio');
            check.setAttribute('name', 'radio');
            checkparent.appendChild(check);
        }
    }
}

const showBuyInfo = (product, choseCarElement, selectedPerson) => {
    const buyInfo = document.getElementById('show-buy-info');
    buyInfo.classList.remove('hidden');

    const elementInfo = document.createElement('div');
    elementInfo.innerHTML = "You have choosen " + product.mark + " car to buy " + choseCarElement.name;
    buyInfo.appendChild(elementInfo);

    const costElement = document.createElement('div');
    costElement.innerHTML = "Transaction price is: " + choseCarElement.price + "$ * " + document.getElementById('example').value + "items = " + (choseCarElement.price * document.getElementById('example').value) + "$"; 
    buyInfo.appendChild(costElement);

    const choosePerson = document.createElement('div');
    choosePerson.innerHTML = "You want to sell it to " + userData[selectedPerson].name;
    buyInfo.appendChild(choosePerson);

    const buyBtnWrapper = document.createElement('div');
    buyBtnWrapper.classList.add('btn-animate');
    buyInfo.appendChild(buyBtnWrapper);
    
    const buyBtn = document.createElement('a');
    buyBtn.innerHTML = 'Buy';
    buyBtn.classList.add('btn-signin');
    buyBtn.addEventListener('click', function() {
        saveOrder(selectedPerson, choseCarElement.name, document.getElementById('example').value);
    })
    buyBtnWrapper.appendChild(buyBtn);
}

const saveOrder = (person, product, count) => {
    let orderedPerson = JSON.parse(localStorage.getItem('loginpers')).nameLog; 
    let order = [cars[activeCar].mark, product, count, orderedPerson];
    let mainUsers = JSON.parse(localStorage.getItem('users'));
    let currentOrder = mainUsers[person].order;
    if(currentOrder === undefined) {
        mainUsers[person].order = [order];
        alert("You have ordered " + product + " from " + mainUsers[person].name);
    } else {
        currentOrder.push(order);
        alert("You have ordered " + product + " from " + mainUsers[person].name);
    }
    localStorage.setItem('users', JSON.stringify(mainUsers));
    document.getElementById('show-buy-info').classList.add('hidden');
    // document.getElementById('buy-parent').classList.add('hidden');
    // document.getElementById('selected-parents').classList.add('hidden');
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
        const userSignUp = {
            nameLog: userData[userData.length-1].name,
            passwordLog: userData[userData.length-1].password,
            postlog: true,
            entry: true,
        }
        localStorage.setItem('loginpers', JSON.stringify(userSignUp));
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
            showSignIn();
            localStorage.setItem('loginpers', JSON.stringify(userDatLog));
            document.getElementById('welcome').innerHTML = 'Welcome, ' + userDatLog.nameLog;
            check = true;
        }
    }
    if(!check) {
        alert("Your login/password are wrong!");
    }
}

// CRUD 

function showUsers() {
    let parentCrud = document.getElementById('crud');

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

        let personName = document.createElement('div')
        personName.innerHTML = `${userData[i].name}`

        let checkparent = document.createElement('div');
        checkparent.setAttribute('data-btn', i);
        wrapper.appendChild(checkparent);

        parentCrud.appendChild(wrapper);
        wrapper.appendChild(personName);

        let personImg = document.createElement('img');
        personImg.classList.add('image');
        personImg.src='images/unknown.jpg';
        wrapper.appendChild(personImg);
        if(!JSON.parse(localStorage.getItem('loginpers')).postlog) {
            showBtn(wrapper, i, parentCrud);
        }        
    }
}

function showBtn(wrapper, i, parentCrud){
        let btnparent = document.createElement('div');
        btnparent.setAttribute('data-btn', i);
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
                showUsers(true);
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