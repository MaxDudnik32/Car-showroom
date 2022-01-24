// Initialization

let mainId;
let userDatLog;
let activeCar;

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

// Complete order

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