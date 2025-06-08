// Theme switching logic
const themes = [
  {
    '--bg-gradient': 'radial-gradient(ellipse at 30% 70%, #181824 40%, #23233a 70%, #0a0a1a 100%)',
    '--text-main': '#bfc3d6',
    '--text-nav': '#e0e0f0',
    '--nav-bg': 'rgba(30, 30, 50, 0.25)',
    '--nav-bg-hover': 'rgba(60, 40, 100, 0.35)',
    '--nav-link-hover': 'rgba(120, 90, 220, 0.18)',
    '--gradient-text': 'linear-gradient(90deg, #bfc3d6 10%, #a18fff 50%, #23233a 90%)',
    '--switch-bg': '#23233a',
    '--switch-knob': '#fff'
  },
  {
    '--bg-gradient': 'radial-gradient(ellipse at 30% 70%, #e6eaff 40%, #bfc3d6 70%, #f8f9ff 100%)',
    '--text-main': '#4b4b6d',
    '--text-nav': '#3a3a5a',
    '--nav-bg': 'rgba(220, 220, 255, 0.25)',
    '--nav-bg-hover': 'rgba(180, 180, 240, 0.35)',
    '--nav-link-hover': 'rgba(160, 140, 220, 0.13)',
    '--gradient-text': 'linear-gradient(90deg, #6d4bc1 10%, #a18fff 50%, #bfc3d6 90%)',
    '--switch-bg': '#e0e0f0',
    '--switch-knob': '#6d4bc1'
  }
];
let themeIndex = 0;
document.addEventListener('DOMContentLoaded', function() {
  const modeSwitch = document.getElementById('modeSwitch');
  function applyTheme(idx) {
    const theme = themes[idx];
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
    if (idx === 1) {
      document.body.classList.add('light-mode');
      modeSwitch.classList.add('light');
    } else {
      document.body.classList.remove('light-mode');
      modeSwitch.classList.remove('light');
    }
  }
  if (modeSwitch) {
    modeSwitch.onclick = () => {
      themeIndex = themeIndex === 0 ? 1 : 0;
      applyTheme(themeIndex);
    };
    applyTheme(themeIndex);
  }

  // Responsive nav logic
  const menuIcon = document.getElementById('menuIcon');
  const mobileNav = document.getElementById('mobileNav');
  const closeNav = document.getElementById('closeNav');
  let navOpen = false;

  function toggleMobileNav(show) {
    navOpen = typeof show === "boolean" ? show : !navOpen;
    if (mobileNav) mobileNav.style.display = navOpen ? 'flex' : 'none';
    if (menuIcon) menuIcon.style.display = navOpen ? 'none' : 'flex';
  }
  if (menuIcon && mobileNav && closeNav) {
    menuIcon.addEventListener('click', () => toggleMobileNav(true));
    menuIcon.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') toggleMobileNav(true);
    });
    closeNav.addEventListener('click', () => toggleMobileNav(false));
    closeNav.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') toggleMobileNav(false);
    });
    Array.from(mobileNav.querySelectorAll('a')).forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileNav(false);
      });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        if (mobileNav) mobileNav.style.display = 'none';
        if (menuIcon) menuIcon.style.display = 'none';
        navOpen = false;
      } else {
        if (menuIcon) menuIcon.style.display = 'flex';
      }
    });
  }
});