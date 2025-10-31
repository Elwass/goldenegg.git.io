const floatingEggsContainer = document.querySelector('.floating-eggs');
const eggCount = window.innerWidth < 768 ? 12 : 24;

function createEgg() {
    const egg = document.createElement('span');
    egg.className = 'egg';
    const size = Math.random() * 40 + 20;
    egg.style.width = `${size}px`;
    egg.style.height = `${size * 1.3}px`;
    egg.style.left = `${Math.random() * 100}%`;
    egg.style.animationDelay = `${Math.random() * -20}s`;
    egg.style.opacity = Math.random() * 0.35 + 0.15;
    floatingEggsContainer.appendChild(egg);
}

for (let i = 0; i < eggCount; i += 1) {
    createEgg();
}

function updateYear() {
    const year = new Date().getFullYear();
    const yearPlaceholder = document.getElementById('currentYear');
    if (yearPlaceholder) {
        yearPlaceholder.textContent = year;
    }
}

updateYear();

const observerOptions = {
    threshold: 0.2,
};

const animatedElements = document.querySelectorAll('.feature-card, .product-card, .timeline-step, .contact-card');

const revealElement = (entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
    }
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(revealElement);
}, observerOptions);

animatedElements.forEach((element) => {
    observer.observe(element);
});

const parallaxHero = document.querySelector('.hero-content');

window.addEventListener('mousemove', (event) => {
    if (!parallaxHero) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 6;
    const y = (event.clientY / window.innerHeight - 0.5) * 6;
    parallaxHero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});

window.addEventListener('mouseleave', () => {
    if (!parallaxHero) return;
    parallaxHero.style.transform = 'translate3d(0, 0, 0)';
});
