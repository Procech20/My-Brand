const form = document.querySelector('form');
const Email = document.querySelector('#email');
const Password = document.querySelector('#password');
const Firstname = document.querySelector('#firstname');
const Surname = document.querySelector('#surname');

let em = document.querySelector('.email-error');
let pass = document.querySelector('.password-error');
let first = document.querySelector('.firstname-error');
let sur = document.querySelector('.surname-error');



// let emRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+){2,}*$/;
// let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
let emError = ["Please input email", "Please input a valid email"]
let passError = ["Password can not be empty", "Password must be atleast 8 chars and Password must include atleast one lowercase letter, one uppercase letter and a special character", "Your Email doesn't belong to any account in our records"]

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = Email.value.trim();
    let password = Password.value.trim();
    let firstName = Firstname.value.trim();
    let surName = Surname.value.trim();
    const data = { email, password, firstName, surName}
    if (!firstName) {
        first.innerHTML = "Please input firstname";
        firstname.classList.add('fail');
        return false
    } else {
        firstname.classList.remove('fail');
        firstname.classList.add('success');
        first.innerHTML = "";
    }
    if (!surName) {
        sur.innerHTML = "Please input surname";
        surname.classList.add('fail');
        return false
    } else {
        surname.classList.remove('fail');
        surname.classList.add('success');
        sur.innerHTML = "";
    }
    if (!email) {
        em.innerHTML = emError[0];
        Email.classList.add('fail');
        return false
    } else {
        Email.classList.remove('fail');
        Email.classList.add('success');
        em.innerHTML = "";
    }
    if (!password) {
        pass.innerHTML = passError[0];
        Password.classList.add('fail');
        return false
    } else {
        Password.classList.remove('fail');
        Password.classList.add('success');
        pass.innerHTML = "";
    }

    // } else if (passValue.length < 9 || passValue.length > 15) {
    //     pass.innerHTML = passError[1];
    //     password.classList.add('fail');
    //     return false
    // } else if (passRegex.test(passValue) == false) {
    //     pass.innerHTML = passError[2];
    //     password.classList.add('fail');
    //     return false
    // } else {
    //     sur.innerHTML = "";
    //     em.innerHTML = "";
    //     pass.innerHTML = "";
    //     const users = []
    //     const id = Math.floor(Math.random() * 1000000)
    //     let parsed = localStorage.getItem('accounts');
    //     let data = JSON.parse(parsed);
    //     if (data?.length >= 1) {
    //         const user = {
    //             'id': id,
    //             'email': emValue,
    //             'password': passValue,
    //             'firstName': firstValue,
    //             'surName': surValue
    //         }
    //         data.push(user);
    //         localStorage.setItem('accounts', JSON.stringify(data));
    //     } else {
    //         const user = {
    //             'id': id,
    //             'email': emValue,
    //             'password': passValue,
    //             'firstName': firstValue,
    //             'surName': surValue

    //         }
    //         users.push(user);
    //         console.log(users);
    //         localStorage.setItem('accounts', JSON.stringify(users))
    //     }
    //     form.reset()
    //     location.href = "login.html";
    //     return true;
    // }

    fetch('https://my-brand-pro.herokuapp.com/api/auth/register', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Cross-Origin': '*',
    },
        body: JSON.stringify(data)
    })
    .then(res => {
        email === null;
      firstName === null;
      surName === null;
      password === null;
      return res.json();
    })
        .then(data => {
      console.log(data);
    // email.classList.add('success');

    if (data.message === 'firstname can only contain letters and numbers') {
        console.log('firstname error!');

        first.innerHTML = "Please input firstname";
        firstname.classList.add('fail');
        Password.classList.add('fail');
    } else {
          first.innerHTML = " ";
        Firstname.classList.remove('fail');
        Firstname.classList.add('success');
      } if (data.message === 'surname can only contain letters and numbers') {
          sur.innerHTML = "Please input your surname";
          Surname.classList.add('fail');
        } else {
          sur.innerHTML = " ";
          Firstname.classList.add('success');
      }
    if (data.status === 400) {
        console.log(data.message);

        em.innerHTML = emError[1];
        Email.classList.add('fail');
        Password.classList.add('fail');
      } else {
          em.innerHTML = '';
          Email.classList.remove('fail');
          Email.classList.add('success');
        } if (data.message === 'password must be atleast 8 characters with atleast one lowercase letter, one uppercase letter and a special character') {
            console.log('Invalid Password!');
            Password.classList.add('fail');
            pass.innerHTML = emError[2];
        } else {

            pass.innerHTML = '';
        Password.classList.remove('fail');
        Password.classList.add('success');
        console.log('Registration Successful', data.message);
        location.href = './login.html';
      }
    })
    .catch(err => {
      console.log('Error signing up...', err.message);
    });
    });
