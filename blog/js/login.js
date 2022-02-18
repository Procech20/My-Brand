const form = document.querySelector('form');
let Email = document.querySelector('#email');
let Password = document.querySelector('#password');
let em = document.querySelector('.email-error');
let pass = document.querySelector('.password-error');

let emError = ["Please input email", "Invalid Email", "User not found"];
let passError = ["Password can not be empty", "Invalid Credentials", "Password can not be Password"]

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let emValue = form.email.value.trim();
  let passValue = form.password.value.trim();

    em.innerHTML = ''
    pass.innerHTML = ''
  fetch('https://my-brand-pro.herokuapp.com/api/auth/login', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Cross-Origin': '*',
    },
    body: JSON.stringify({
      email: emValue,
      password: passValue,
    })
  })
    .then(res => {
      email === null;
      password === null;
      return res.json();
    })
    .then(data => {

  if (!emValue) {
    em.innerHTML = emError[0];
    Email.classList.add('fail');
  }
  else if (!passValue) {
    pass.innerHTML = passError[0];
    Password.classList.add('fail');
  } else if (passValue.toLowerCase() === 'password') {
        pass.innerHTML = passError[2];
        Password.classList.add('fail');

      } else if (data.message === 'Invalid credentials') {
        pass.innerHTML = passError[1];
        Email.classList.add('fail');
        Password.classList.add('fail');
      } else if (data.message === 'User Not found') {
        pass.innerHTML = passError[1];
            Email.classList.add('fail');
            Password.classList.add('fail');

          } else {
            Email.classList.add('success');
            Password.classList.add('success');
        console.log('Authentication Successful...');
        const token = data.data.token;
        const role = data.data.role;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem("isLoggedIn", true);
        window.location.href = './blogs.html';
      }
    })
    .catch(err => {
      console.log('Error logging in...', err.message);
    });
    email = '';
  password = '';
});
const validation = () => {};
