// Busca o botão usado para alternar as cores da página.
const themeToggle = document.querySelector('.theme-toggle');
// O CSS reconhece esta classe para aplicar as cores do modo escuro.
const darkModeClass = 'dark-mode';

// Aplica o tema, avisa o leitor de tela e guarda a escolha neste navegador.
function setTheme(isDark) {
  document.body.classList.toggle(darkModeClass, isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Só configura a troca de tema se o botão existir nesta página.
if (themeToggle) {
  // A escolha salva tem prioridade sobre o tema configurado no dispositivo.
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  // O clique inverte o tema que está sendo mostrado agora.
  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains(darkModeClass));
  });
}
