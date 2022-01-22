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