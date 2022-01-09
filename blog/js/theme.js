const bodyElement = document.querySelector('body');
const defaultTheme = localStorage.getItem('theme');
const switcher = document.querySelector('.theme-switcher');

const setThemeTo = (theme) => {
  if (theme === null) localStorage.setItem('theme', 'dark');

  bodyElement.classList.remove('light');
  bodyElement.classList.remove('dark');
  bodyElement.classList.add(theme === null ? 'dark' : theme);
  switcher
    .querySelectorAll('span')
    .forEach((spn) => spn.classList.remove('show'));

  switcher
    .querySelector(theme === null ? `.dark` : `.${theme}`)
    .classList.add('show');
};

setThemeTo(defaultTheme);

switcher.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme');
  const theme = currentTheme === 'dark' ? 'light' : 'dark';

  localStorage.setItem('theme', theme);
  setThemeTo(theme);
});
