const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
let em = document.querySelector('.email-error');
let pass = document.querySelector('.password-error');

let emError = ["Please input email", "Invalid Email"]
let passError = ["Password can not be empty", "Incorrect password", "Password can not be Password"]

const accounts = JSON.parse(localStorage.getItem('accounts'));

form.addEventListener('submit', (e) => {

    let emValue = email.value.trim();
    let passValue = password.value.trim();

    e.preventDefault();
    email.classList.add('success');
    if (!emValue) {
        em.innerHTML = emError[0];
        email.classList.add('fail');
    }
    else {
        email.classList.remove('fail');
        email.classList.add('success');
        em.innerHTML = "";
    }
    if (!passValue) {
        pass.innerHTML = passError[0];
        password.classList.add('fail');
    } else {
        password.classList.remove('fail');
        password.classList.add('success');
        pass.innerHTML = "";
    }
    if (passValue.toLowerCase() === 'password') {
        pass.innerHTML = passError[2];
        password.classList.add('fail');
    } else {
        password.classList.remove('fail');
        password.classList.add('success');
        pass.innerHTML = "";
    }
    if (!accounts.find(e => e.email === emValue)) {
        em.innerHTML = emError[1];
        email.classList.add('fail');
    }
    else if (!accounts.find(e => e.email === emValue && e.password === passValue)) {
        pass.innerHTML = passError[1];
        password.classList.add('fail');
    } else {
        localStorage.setItem("loggedInUser", JSON.stringify(accounts.find(e => e.email === emValue && e.password === passValue)))
        localStorage.setItem("isLoggedIn", true)
        window.location.href = '/blog/blogs.html';
    }
});
