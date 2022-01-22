// Initialization

let mainId;
let userDatLog;
let activeCar;

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
}