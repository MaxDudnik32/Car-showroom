// Initialization

let mainId;
let userDatLog;
let activeCar;

// Load

const checkOrder = () => {
    const checkOrder = JSON.parse(localStorage.getItem('users'));
    const orderPers = JSON.parse(localStorage.getItem('loginpers'));
    if(checkOrder) {
        for(let i = 0; i < checkOrder.length; i++) {
            if(checkOrder[i].name === orderPers.nameLog) {
                if(checkOrder[i].order) {
                    for(let j = 0; j < checkOrder[i].order.length; j++) {
                        if(checkOrder[i].order[j].status === false) {
                            orderMessage(checkOrder[i].order, i, checkOrder[i]);
                        }
                    }
                }
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

const orderMessage = (order, checkOrder, sellPers) => {
    const orderParent = document.getElementById('chose-car');
    orderParent.classList.add('padding-car');
    orderParent.innerHTML = `
    <div id="close-car-btn" class="close-car">
        <i class="fas fa-times"></i>
    </div>
    `;
    orderParent.classList.remove('hidden');

    document.getElementById('close-car-btn').addEventListener('click', function() {
        document.getElementById('chose-car').classList.add('hidden');
    })

    const orderText = document.createElement('div');
    orderText.classList.add('order-text')
    if(order.length > 1) {
        orderText.innerHTML = 'You achived ' + order.length + ' orders!';
    } else {
        orderText.innerHTML = 'You achived ' + order.length + ' order!';
    }
    orderParent.appendChild(orderText);

    for(let i = 0; i < order.length; i++) {
        if(sellPers.order[i].status === false) {
            const infoOrder = document.createElement('div');
            infoOrder.innerHTML = 'The order is: ' + order[i].carMark + ' car ' + order[i].carProduct + ' model ' + order[i].productCount + ' count from ' + order[i].orderedName;
            orderParent.appendChild(infoOrder);
        }
    }

    const acceptBtn = document.createElement('a');
    acceptBtn.classList.add('get-info');
    acceptBtn.classList.add('get-info-car');
    acceptBtn.innerHTML = 'Accept all';
    acceptBtn.addEventListener('click', function() {
        orderParent.classList.add('hidden');
        for(let i = 0; i < order.length; i++) {
            if(sellPers.order[i].status === false) {
                completeOrder(order[i].carMark, order[i].carProduct, order[i].productCount, order[i].orderedName, checkOrder, i);   
            }
        }
    })
    orderParent.appendChild(acceptBtn);
}

const completeOrder = (carName, detailName, countName, orderedPersonName, orderedPerson, currentOrder) => {
    const checkOrder = JSON.parse(localStorage.getItem('users'));
    checkOrder[orderedPerson].order[currentOrder].status = true;
    for(let i = 0; i < checkOrder.length; i++) {
        if(checkOrder[i].name === orderedPersonName) {
            let boughtArr = {
                carName: carName, 
                detailName: detailName,
                countName: countName,
                orderedName: checkOrder[orderedPerson].name};
            // let boughtArr = [carName, 
            //     detailName,
            //     countName,
            //     checkOrder[orderedPerson].name];
            if(checkOrder[i].bought) {
                checkOrder[i].bought.push(boughtArr);
            } else {
                checkOrder[i].bought = [boughtArr];
            }
        }
    }
    localStorage.setItem('users', JSON.stringify(checkOrder));
    if(JSON.parse(localStorage.getItem('products'))) {
        let carOrder = JSON.parse(localStorage.getItem('products'));
        for(let i = 0; i < carOrder.length; i++) {
            if(carOrder[i].mark === carName) {
                let index = i;
                for(let j = 0; j < carOrder[index].details.length; j++) {
                    if(carOrder[index].details[j].name === detailName) {
                        carOrder[0].details[0].count = carOrder[0].details[0].count - countName; 
                        localStorage.setItem('products', JSON.stringify(carOrder));
                    }
                }
            }
        }
    } else {
        for(let i = 0; i < cars.length; i++) {
            if(cars[i].mark === carName) {
                let index = i;
                for(let j = 0; j < cars[index].details.length; j++) {
                    if(cars[index].details[j].name === detailName) {
                        cars[0].details[0].count = cars[0].details[0].count - countName; 
                        localStorage.setItem('products', JSON.stringify(cars));
                    }
                }
            }
        }
    }
}

// Previous

const previousBtn = () => {
    unhideElements();
    // Previous Btn
    document.getElementById('back-wrapper').classList.add('hidden');
    // Main-product
    document.getElementById('main-products').classList.remove('main-products');
    document.getElementById('main-products').classList.add('hidden');
    document.getElementById('info-car').classList.remove('info-car');
    document.getElementById('info-car').innerHTML = '';
    //Crud
    document.getElementById('crud').innerHTML = '';
    // Bucket
    document.getElementById('show-buy-info').classList.add('hidden');
}

// Drop down

const checkEntry = () => {
    if(localStorage.getItem('loginpers')) {
        return true;
    } else {
        return false;
    }
}

const checkManager = () => {
    return JSON.parse(localStorage.getItem('loginpers')).postlog;
}

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
    document.getElementById('back-wrapper').classList.remove('hidden');
    document.getElementById('info-car').classList.remove('info-car');
    document.getElementById('info-car').classList.add('hidden');
    hideElements();
    showUsers();
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

// Dynamic car

const showProductInfo = (checkInfo) => {
    // const main = document.getElementById('main');

    const productParent = document.getElementById('main-products');
    productParent.classList.add('main-products');
    productParent.innerHTML = "";

    const imgParents = document.createElement('div');
    imgParents.setAttribute('id', 'car-elements');
    imgParents.classList.add('car-elements');

    const infoCar = document.getElementById('info-car');
    infoCar.classList.add('info-car');

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

    const infoCarParent = document.createElement('div');
    infoCarParent.classList.add('info-car-parent');

    const buyParent = document.createElement('div');
    buyParent.setAttribute('id', 'buy-parent');
    buyParent.classList.add('buy-parent');

    const checkParents = document.createElement('div');
    checkParents.setAttribute('id', 'selected-parents');

    
    productParent.appendChild(imgParents);
    productParent.appendChild(infoCarParent);
    infoCarParent.appendChild(buyParent);
    infoCarParent.appendChild(checkParents);
}

const showProductsDetails = (carIndex, elementToBuy) => {
    const product = cars[carIndex];
    const choseCarElement = product.details[elementToBuy];

    const wrapper = document.getElementById('buy-parent');
    wrapper.classList.remove('hidden');
    wrapper.innerHTML = "";

    const nameElement = document.createElement('div');
    nameElement.classList.add('name-info');
    nameElement.innerHTML = product.mark + " " + choseCarElement.name;
    wrapper.appendChild(nameElement);

    const infoProductWrapper = document.createElement('div');
    infoProductWrapper.classList.add('info-product-wrapper');
    wrapper.appendChild(infoProductWrapper);

    const priceElement = document.createElement('div');
    priceElement.innerHTML = choseCarElement.price + ".00 $";
    priceElement.classList.add('price-info');
    infoProductWrapper.appendChild(priceElement);

    const amountElement = document.createElement('div');
    amountElement.innerHTML = "(" + choseCarElement.count + " in stock)";
    infoProductWrapper.appendChild(amountElement);

    if(checkManager() === true) {
        const buyBtnInfoWrapper = document.createElement('div');
        buyBtnInfoWrapper.classList.add('buy-btn-wrapper');

        const buyWrapper = document.createElement('div');
        buyWrapper.classList.add('buy-wrapper');
        buyWrapper.innerHTML = `<i class="fas fa-credit-card"></i>`;

        const buyAmount = document.createElement('input');
        buyAmount.setAttribute('type', 'text');
        buyAmount.setAttribute('id', 'example');
        buyAmount.classList.add('buy-input');

        const buyButton = document.createElement('a');
        buyButton.innerHTML = "Buy now";
        buyButton.setAttribute('id', 'buyButton');
        buyButton.classList.add('buy-btn');

        wrapper.appendChild(buyBtnInfoWrapper);
        buyBtnInfoWrapper.appendChild(buyAmount);
        buyBtnInfoWrapper.appendChild(buyWrapper);
        buyWrapper.appendChild(buyButton);

        buyWrapper.addEventListener('click', function() {
            const radioBtn = document.querySelectorAll('[name*="radio"]');
            const nameBtn = document.querySelectorAll('[data-name*="name"]');
            let radioCheck = false;
            let selectedPerson;
            for(let i in radioBtn) {
                if(radioBtn[i].checked) {
                    for(let j in userData) {
                        if (nameBtn[i].innerHTML === userData[j].name) {
                            radioCheck = true;
                            selectedPerson = j;
                        }
                    }
                }    
            }
            if(document.getElementById('example').value > choseCarElement.count) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have choosen to much items',
                })
            } else if(radioCheck != true) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You need to choose user!',
                })
            } else {
                showBuyInfo(product, choseCarElement, selectedPerson);
            }
        })
    }
}

const showUsersToSelect = () => {
    const checkParentss = document.getElementById('selected-parents');

    checkParentss.classList.remove('hidden');
    checkParentss.classList.add('selected-parents');

    let parentUsersToSelect = document.getElementById('main-products');
    // parentUsersToSelect.appendChild(checkParentss);

    let sellUserInfo = document.createElement('div');
    if(userData.length < 2) {
        sellUserInfo.innerHTML = "Nobody sells this product";
    } else {
        if(JSON.parse(localStorage.getItem('loginpers')).postlog) {
            sellUserInfo.innerHTML = "Choose supplier" ;
        } else {
            sellUserInfo.innerHTML = "Choose person to whom you want to sell it";
        }
    }
    checkParentss.appendChild(sellUserInfo);

    for(let i=0; i<userData.length; i++){
        if(JSON.parse(localStorage.getItem('users'))[i].name !== JSON.parse(localStorage.getItem('loginpers')).nameLog) {
            const wrapper = document.createElement('div')
            wrapper.setAttribute('data-id', i)
            wrapper.classList.add('user')

            let personName = document.createElement('div');
            personName.setAttribute('data-name', 'name');
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
    buyInfo.innerHTML = `
    <div id="close-bucket-btn" class="close-buck">
        <i class="fas fa-times"></i>
    </div>
    `;
    buyInfo.classList.remove('hidden');

    const closeBucket = document.getElementById('close-bucket-btn');
    closeBucket.addEventListener('click', function() {
        buyInfo.classList.add('hidden');
    })

    const elementInfo = document.createElement('div');
    elementInfo.innerHTML = "You have choosen " + product.mark + " car to buy " + choseCarElement.name;
    buyInfo.appendChild(elementInfo);

    // const imgChoose = document.createElement('img');
    // imgChoose.src = 'images/cars/' + (activeCar+1) + '.png';
    // imgChoose.classList.add('img-buck');
    // buyInfo.appendChild(imgChoose);

    const costElement = document.createElement('div');
    costElement.classList.add('cost-text');
    costElement.innerHTML = "Transaction price is: " + choseCarElement.price + "$ * " + document.getElementById('example').value + "items = " + (choseCarElement.price * document.getElementById('example').value) + "$"; 
    buyInfo.appendChild(costElement);

    const choosePerson = document.createElement('div');
    choosePerson.innerHTML = "You want to buy it from " + userData[selectedPerson].name + '?';
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
    let order = {carMark: cars[activeCar].mark, 
            carProduct: product, 
            productCount: count, 
            orderedName: orderedPerson, 
            status: false};
    // let order = [cars[activeCar].mark, product, count, orderedPerson, false];
    let mainUsers = JSON.parse(localStorage.getItem('users'));
    let currentOrder = mainUsers[person].order;
    if(currentOrder === undefined) {
        mainUsers[person].order = [order];
        Swal.fire({
            icon: 'success',
            title: 'Congrat!',
            text: 'You have ordered ' + product + ' from ' + mainUsers[person].name,
        })
    } else {
        currentOrder.push(order);
        Swal.fire({
            icon: 'success',
            title: 'Congrat!',
            text: 'You have ordered ' + product + ' from ' + mainUsers[person].name,
        })
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

// Login Sign Up Form

const showSignForm = () => {
    document.getElementById('form-signin').classList.add('form-signin-left');
    document.getElementById('form-signup').classList.add('form-signup-left');
    document.getElementById('frame').classList.add('frame-long');
    document.getElementById('signup-inactive').classList.remove('signup-inactive');
    document.getElementById('signup-inactive').classList.add('signup-active');
    document.getElementById('signin-active').classList.remove('signin-active');
    document.getElementById('signin-active').classList.add('signin-inactive');
    // document.getElementById('forgot').classList.add('forgot-left');
    // this.classList.remove("idle").classList.add("active");
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
    // this.classList.remove("idle").classList.add("active");
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
            if(checkCrud) {
                savePerson(userDat, true);
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats!',
                    text: 'Success editing',
                })
                formName.classList.add('hidden');
                document.getElementById('crudframe').classList.add('hidden');
            } else {
                savePerson(userDat,checkCrud, false);
                showSignUp(valid, formName);
            }
        } else if (!isValidName(userDat.name)) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'Your name is incorect',
            })
        } else if (!isValidEmail(userDat.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'Your email is incorrect',
            })
        } else if (!isValidPassword(userDat.password)) {
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'In password you need more than 8 elements and one number!',
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'You passwords arent correct',
            })
        }

        // saveValid(userDat);
        
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'You provided incomplete information!',
        })
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

const savePerson = (user, editcheck) => {
    let myNode = document.getElementById('crud');
    if(editcheck) {
        userData[mainId].name = user.name;
        userData[mainId].password = user.password;
        userData[mainId].email = user.email;
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
        // if(checkCrud) {
        //     while(myNode.firstChild) {
        //         myNode.removeChild(myNode.firstChild);
        //     }
        //     showUsers();
        // }
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
        Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'Your login/password are wrong!',
        })
    }
}

// CRUD 

function showUsers() {
    let parentCrud = document.getElementById('crud');
    parentCrud.innerHTML = `
    <table id="crud-table">
        <tr>
            <td class="main-td">ID</td>
            <td class="main-td">NAME</td>
            <td class="main-td" id="email-table">EMAIL</td>
            <td class="main-td" id="action-table">ACTION</td>
         </tr>
    </table>
    `;

    // if(parentCrud === null){
    //     parentCrud = document.createElement('div')
    //     parentCrud.setAttribute('id', 'crud') 
    //     // document.querySelector('body').appendChild(parentCrud)
    //     document.getElementById('main').appendChild(parentCrud);
    // }

    for(let i=0; i<userData.length; i++){
        // const wrapper = document.createElement('div')
        // wrapper.setAttribute('data-id', i)
        // wrapper.classList.add('user')

        const crudTable = document.getElementById('crud-table');

        const crudTrPerson = document.createElement('tr');
        crudTrPerson.setAttribute('data-id', i);
        crudTable.appendChild(crudTrPerson);

        let idPerson = document.createElement('div');
        idPerson.innerHTML = (i + 1);

        const crudTd1 = document.createElement('td');
        crudTd1.appendChild(idPerson);
        crudTrPerson.appendChild(crudTd1);

        let personName = document.createElement('div');
        personName.innerHTML = `${userData[i].name}`;

        const crudTd2 = document.createElement('td');
        crudTd2.appendChild(personName);
        crudTrPerson.appendChild(crudTd2);

        if(!JSON.parse(localStorage.getItem('loginpers')).postlog) {
            let personEmail = document.createElement('div');
            personEmail.innerHTML = `${userData[i].email}`;

            const crudTd3 = document.createElement('td');
            crudTd3.appendChild(personEmail);
            crudTrPerson.appendChild(crudTd3);

            const crudTd4 = document.createElement('td');
            showBtn(i, parentCrud, crudTrPerson, crudTd4);
        } else {
            document.getElementById('email-table').classList.add('hidden');
            document.getElementById('action-table').classList.add('hidden');
        }

        // parentCrud.appendChild(wrapper);
        // wrapper.appendChild(personName);

        // if(!JSON.parse(localStorage.getItem('loginpers')).postlog) {
        //     showBtn(wrapper, i, parentCrud);
        // }     
    }
}

function showBtn(i, parentCrud, crudTrPerson, crudTd4){
        let btnparent = document.createElement('div');
        btnparent.setAttribute('data-btn', i);
        btnparent.classList.add('button')

        let view = document.createElement('a');
        view.setAttribute('id', 'view-btn')
        view.innerHTML = 'View';
        view.addEventListener('click', function(){
            const id = crudTrPerson.getAttribute('data-id');
            const userDataBuy = JSON.parse(localStorage.getItem('users'));
            if(userDataBuy[id].bought) {
                showBought(userDataBuy[id].bought, userDataBuy[id].name);
            } else {
                Swal.fire({
                    icon: 'question',
                    title: 'Oops...',
                    text: 'We have no info about this person',
                })
            }

            // let info = document.createElement('div')
            // info.innerHTML = `${userData[i].name} ${userData[i].age} years old`
            // parentCrud.appendChild(info)
        })

        let remove = document.createElement('a');
        remove.setAttribute('id', 'remove-btn');
        remove.innerHTML = 'Del';
        remove.addEventListener('click', function(){
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to delete this person!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Congrat!',
                        'Your have deleted this person',
                        'success'
                    )
                    const id = crudTrPerson.getAttribute('data-id');
                    parentCrud.innerHTML = "";
                    userData.splice(id, 1);
                    localStorage.setItem('users',JSON.stringify(userData))
                    showUsers();
                    localStorage.removeItem('loginpers', JSON.stringify());
                    document.getElementById('mainMenu').classList.add('hidden');
                    document.getElementById('loginNav').classList.remove('hidden');
                    unhideElements();
                    document.getElementById('crud').innerHTML = '';
                    document.getElementById('back-wrapper').classList.add('hidden');
                } else {
                    Swal.fire('You are still here!');
                }
            })
        })

        let edit = document.createElement('a');
        edit.setAttribute('id', 'edit-btn')
        edit.innerHTML = 'Edit';
        edit.addEventListener('click', function(){
            let form = document.getElementById('form-crud');
            document.getElementById('crudframe').classList.add('framecrud');
            document.getElementById('crudframe').classList.remove('hidden');
            form.classList.remove('hidden');
            mainId = crudTrPerson.getAttribute('data-id');
            document.getElementById('editform').innerHTML = `Edit form of ${userData[i].name}`;
            form.elements.username.value = userData[i].name;
            form.elements.email.value = userData[i].email;
            form.elements.password.value = userData[i].password;
        })

        crudTrPerson.appendChild(crudTd4);
        crudTd4.appendChild(btnparent);
        btnparent.appendChild(view);
        btnparent.appendChild(edit);
        btnparent.appendChild(remove);
}

const showBought = (order, namePers) => {
    const boughtParent = document.getElementById('chose-car');
    boughtParent.innerHTML = `
    <div id="close-btn" class="close">
        <i class="fas fa-times"></i>
    </div>
    `;
    boughtParent.classList.remove('hidden');

    document.getElementById('close-btn').addEventListener('click', function() {
        boughtParent.classList.add('hidden');
    })

    const boughtOrder = JSON.parse(localStorage.getItem('users'))

    const infoBuyWrapper = document.createElement('div');
    infoBuyWrapper.classList.add('info-buy-wrapper');
    boughtParent.appendChild(infoBuyWrapper);
    
    for(let i = 0; i < order.length; i++) {
        const boughtText = document.createElement('div');
        boughtText.classList.add('bought-text');
        boughtText.innerHTML = namePers + ' have bought ' + order[i].countName + ' ' + order[i].carName + ' ' + order[i].detailName + ' from ' + order[i].orderedName;
        infoBuyWrapper.appendChild(boughtText);
    }
}