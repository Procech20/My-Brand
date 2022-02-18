const role = localStorage.getItem('userRole');
const dashboard = document.querySelector('#admin');
const create = document.querySelector('#create');
const log = document.querySelector('#log-btn');
const actions = document.querySelector('.actions')
const logValue = document.querySelector('.log-value');
const logged = localStorage.getItem('isLoggedIn');

if (logged) {
  logValue.innerHTML = 'Logout'
}
const handleShowLinkMobile = () => {
    const links = document.querySelector('.navbar .links');
    links.classList.toggle('hide');
};

document
    .querySelector('.links')
    .addEventListener('click', handleShowLinkMobile);

document
    .querySelector('.toggle')
    .addEventListener('click', handleShowLinkMobile);

if (role === 'Admin') {
    dashboard.style.display = 'block'
    create.style.display = 'block'
}


if (logValue.innerHTML === 'Logout') {

    log.addEventListener('click', () => {
        location.href = 'login.html';
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        logValue.innerHTML = 'Logout';

    });
}
