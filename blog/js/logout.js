const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const firstname = document.querySelector('#firstname');
const surname = document.querySelector('#surname');

let em = document.querySelector('.email-error');
let pass = document.querySelector('.password-error');
let first = document.querySelector('.firstname-error');
let sur = document.querySelector('.surname-error');



let emRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+){2,}*$/;
let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
let emError = ["Please input email", "Invalid email", "Your Email doesn't belong to any account in our records"]
let passError = ["Password can not be empty", "Password must be atleast 9 chars and no longer than 15 chars", "Password must include atleast one lowercase letter, one uppercase letter and a special character", "Your Email doesn't belong to any account in our records"]

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let emValue = email.value.trim();
    let passValue = password.value.trim();
    let firstValue = firstname.value.trim();
    let surValue = surname.value.trim();

    if (!firstValue) {
        first.innerHTML = "Please input firstname";
        firstname.classList.add('fail');
        return false
    } else {
        firstname.classList.remove('fail');
        firstname.classList.add('success');
        first.innerHTML = "";
    }
    if (!surValue) {
        sur.innerHTML = "Please input surname";
        surname.classList.add('fail');
        return false
    } else {
        surname.classList.remove('fail');
        surname.classList.add('success');
        sur.innerHTML = "";
    }
    if (!emValue) {
        em.innerHTML = emError[0];
        email.classList.add('fail');
        return false
    } else {
        email.classList.remove('fail');
        email.classList.add('success');
        em.innerHTML = "";
    }
    if (!passValue) {
        pass.innerHTML = passError[0];
        password.classList.add('fail');
        return false
    } else {
        password.classList.remove('fail');
        password.classList.add('success');
        pass.innerHTML = "";
    }
    if (emRegex.test(emValue) == false) {
        em.innerHTML = emError[1];
        email.classList.add('fail');
        return false
    } else if (passValue.length < 9 || passValue.length > 15) {
        pass.innerHTML = passError[1];
        password.classList.add('fail');
        return false
    } else if (passRegex.test(passValue) == false) {
        pass.innerHTML = passError[2];
        password.classList.add('fail');
        return false
    } else {
        sur.innerHTML = "";
        em.innerHTML = "";
        pass.innerHTML = "";
        const users = []
        const id = Math.floor(Math.random() * 1000000)
        let parsed = localStorage.getItem('accounts');
        let data = JSON.parse(parsed);
        if (data?.length >= 1) {
            const user = {
                'id': id,
                'email': emValue,
                'password': passValue,
                'firstName': firstValue,
                'surName': surValue
            }
            data.push(user);
            localStorage.setItem('accounts', JSON.stringify(data));
        } else {
            const user = {
                'id': id,
                'email': emValue,
                'password': passValue,
                'firstName': firstValue,
                'surName': surValue

            }
            users.push(user);
            console.log(users);
            localStorage.setItem('accounts', JSON.stringify(users))
        }
        form.reset()
        location.href = "login.html";
        return true;
    }
});
