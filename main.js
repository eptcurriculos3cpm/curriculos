const themeToggle = document.querySelector('.theme-toggle');
const darkModeClass = 'dark-mode';

function setTheme(isDark) {
  document.body.classList.toggle(darkModeClass, isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains(darkModeClass));
  });
}
