const handleShowLinkMobile = () => {
    const links = document.querySelector('.navbar .links');
    links.classList.toggle('hide');
};

const dashboard = document.querySelector('#admin');
const accounts = localStorage.getItem('accounts');
const log = document.querySelector('#log-btn');


document
    .querySelector('.links')
    .addEventListener('click', handleShowLinkMobile);

document
    .querySelector('.toggle')
    .addEventListener('click', handleShowLinkMobile);

if (accounts.length > 1) {
    log.innerHTML = 'Logout';
    dashboard.style.display = 'block'
}
if (log.innerHTML === 'Logout') {

    log.addEventListener('click', () => {
        location.href = 'login.html';
        localStorage.setItem("isLoggedIn", false);
        localStorage.removeItem("loggedInUser")

    });
}
