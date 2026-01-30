// --- Configuration & State ---
const themes = ['normal', 'dark', 'light'];
let currentThemeIndex = 0;

const icons = {
    normal: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    dark: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
};

// --- Selectors ---
const spotlight = document.getElementById('spotlight');
const sections = document.querySelectorAll('section');
const desktopLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

// --- Theme Logic ---
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'normal' ? '' : theme);
    localStorage.setItem('portfolio-theme', theme);
    currentThemeIndex = themes.indexOf(theme);
    
    // Fixed: Ensure icons update across all theme buttons found in DOM
    const btnIcons = document.querySelectorAll('.theme-btn');
    btnIcons.forEach(btn => {
        const container = btn.querySelector('.icon-slot');
        if (container) {
            container.innerHTML = icons[theme];
        } else {
            btn.innerHTML = icons[theme];
        }
    });

    onScroll(); // Refresh colors for active links based on theme change
}

function toggleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(themes[currentThemeIndex]);
}

// --- Mobile Menu Logic ---
function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// --- Spotlight Logic ---
window.addEventListener('mousemove', e => {
    if(spotlight) {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
    }
});

// --- Scroll Spy Logic ---
function onScroll() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    desktopLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
    
    mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

// --- Event Listeners ---
window.addEventListener('scroll', onScroll);

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when any link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fixed: Added event listener to handle theme toggling correctly
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
    });
});

// --- Initialization ---
const savedTheme = localStorage.getItem('portfolio-theme') || 'normal';
applyTheme(savedTheme);
onScroll();

/* --- Console Message --- */
console.clear();
const mainStyle = "color: #5eead4; background: #111111; font-size: 14px; font-weight: bold; padding: 10px; border-radius: 4px; border: 1px solid #5eead4; font-family: 'Inter', sans-serif";
const secondaryStyle = "color: #a1a1aa; font-size: 12px; font-family: monospace;";

console.log("%c🚀 Developed by Yousuf Humran", mainStyle);
console.log("%cGitHub: https://github.com/yousuf-humran", "color: #5eead4; font-size: 12px; text-decoration: underline;");