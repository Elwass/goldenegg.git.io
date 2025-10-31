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

const chickenButton = document.querySelector('.runaway-chicken');
const chickenPlayground = document.querySelector('.chicken-playground');
const chickenStatus = document.querySelector('.chicken-status');

if (chickenButton && chickenPlayground) {
    let escapeCount = 0;
    const margin = 18;

    const setStatus = (message) => {
        if (chickenStatus) {
            chickenStatus.textContent = message;
        }
    };

    const repositionChicken = (announceEscape = true) => {
        const playgroundWidth = chickenPlayground.clientWidth;
        const playgroundHeight = chickenPlayground.clientHeight;
        const chickenWidth = chickenButton.offsetWidth;
        const chickenHeight = chickenButton.offsetHeight;

        const maxX = Math.max(playgroundWidth - chickenWidth, 0);
        const maxY = Math.max(playgroundHeight - chickenHeight, 0);

        const safeX = Math.max(maxX - margin * 2, 0);
        const safeY = Math.max(maxY - margin * 2, 0);

        const x = safeX > 0 ? margin + Math.random() * safeX : maxX / 2;
        const y = safeY > 0 ? margin + Math.random() * safeY : maxY / 2;
        const rotation = (Math.random() * 24 - 12).toFixed(2);

        chickenButton.style.setProperty('--x', `${x}px`);
        chickenButton.style.setProperty('--y', `${y}px`);
        chickenButton.style.setProperty('--rotate', `${rotation}deg`);

        chickenButton.classList.add('escaping');
        setTimeout(() => chickenButton.classList.remove('escaping'), 320);

        if (announceEscape) {
            escapeCount += 1;
            setStatus(`Ayam kabur ${escapeCount}x!`);
        } else if (escapeCount === 0) {
            setStatus('Ayam siap kabur!');
        }
    };

    const triggerEscape = (event) => {
        if (event) {
            event.preventDefault();
        }
        repositionChicken(true);
    };

    chickenButton.addEventListener('pointerdown', triggerEscape);
    chickenButton.addEventListener('pointerenter', triggerEscape);
    chickenButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            triggerEscape(event);
        }
    });

    window.addEventListener('resize', () => {
        repositionChicken(false);
    });

    requestAnimationFrame(() => {
        repositionChicken(false);
    });
}

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
