const body = document.querySelector('body');
const themeToggleBtn = document.getElementById('theme-toggle');
const yearElement = document.getElementById("year");

// Set Year
if(yearElement) {
  yearElement.innerHTML = new Date().getFullYear();
}

// Theme Handling
const THEME_KEY = 'jd-theme';
const DARK_THEME_CLASS = 'night';

function getPreferredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add(DARK_THEME_CLASS);
    if(themeToggleBtn) themeToggleBtn.innerHTML = '<span class="toggle-icon">☀</span>';
  } else {
    body.classList.remove(DARK_THEME_CLASS);
    if(themeToggleBtn) themeToggleBtn.innerHTML = '<span class="toggle-icon">☾</span>';
  }
  localStorage.setItem(THEME_KEY, theme);
}

// Initialize
setTheme(getPreferredTheme());

// Event Listener
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(THEME_KEY)) { // Only auto-switch if user hasn't manually set a preference
     setTheme(e.matches ? 'dark' : 'light');
  }
});