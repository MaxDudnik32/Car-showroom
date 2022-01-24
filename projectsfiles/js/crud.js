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

    for(let i=0; i<userData.length; i++){

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