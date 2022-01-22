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