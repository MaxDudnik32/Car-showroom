const checkLocal = () => {
    if(localStorage.getItem('users')) {
        return JSON.parse(localStorage.getItem('users'))
    } else {
        return [];
    }
}

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