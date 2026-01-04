// ===================================
// Portfolio JavaScript - Main Functionality
// ===================================

// ===================================
// Navigation & Mobile Menu
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Theme Toggle (Dark/Light Mode)
// ===================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


// FORCE DARK MODE - Clear any saved light theme
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('Name', 'AppNet');
    console.log('FORCE DARK MODE');
}

// Remove light theme class to ensure dark mode
body.classList.remove('light-theme');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    // Dark mode (default)
    body.classList.remove('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    // Update icon and save preference
    if (body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ===================================
// Language Toggle (French/English)
// ===================================
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('language') || 'fr';

// Initialize language on page load
function initLanguage() {
    changeLanguage(currentLang);
    updateLangToggle(currentLang);
}

// Update language toggle button
function updateLangToggle(lang) {
    langToggle.querySelector('span').textContent = lang.toUpperCase();
}

// Change language function
function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];

        // Navigate through nested translation object
        for (const k of keys) {
            value = value[k];
        }

        if (value) {
            element.textContent = value;
        }
    });

    // Update specific sections that need special handling
    updateServicesSection(lang);
    updateWhyChooseSection(lang);
    updateProcessSection(lang);
    updatePricingSection(lang);
    updateProjectsSection(lang);
    updateAboutSection(lang);
    updateTestimonialsSection(lang);
    updateContactSection(lang);
    updateFooterSection(lang);
    updateNotificationMessages(lang);
}

// Update Services Section
function updateServicesSection(lang) {
    const t = translations[lang].services;

    // Update skills in marquee
    const skillTags = document.querySelectorAll('.services-marquee .skill-tag');
    const skillsArray = [
        t.skills.landingPages,
        t.skills.siteVitrines,
        t.skills.applicationsWeb,
        t.skills.ecommerce,
        t.skills.dashboards,
        t.skills.seo,
        t.skills.uxUiDesign,
        t.skills.maintenance
    ];

    skillTags.forEach((tag, index) => {
        if (index < skillsArray.length) {
            tag.textContent = skillsArray[index % skillsArray.length];
        }
    });

    // Update service cards
    const serviceCards = document.querySelectorAll('.skill-card');
    const cardsData = [t.cards.landing, t.cards.vitrine, t.cards.platform];

    serviceCards.forEach((card, index) => {
        if (cardsData[index]) {
            const h3 = card.querySelector('h3');
            const p = card.querySelector('p');
            const spans = card.querySelectorAll('.skill-list span');

            if (h3) h3.textContent = cardsData[index].title;
            if (p) p.textContent = cardsData[index].description;
            if (spans[0]) spans[0].textContent = cardsData[index].tag1;
            if (spans[1]) spans[1].textContent = cardsData[index].tag2;
            if (spans[2]) spans[2].textContent = cardsData[index].tag3;
        }
    });
}

// Update Why Choose Section
function updateWhyChooseSection(lang) {
    const t = translations[lang].whyChoose;
    const section = document.querySelector('.why-choose');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;

    const items = section.querySelectorAll('.why-item');
    const itemsData = [
        t.items.customSolutions,
        t.items.cleanCode,
        t.items.responsive,
        t.items.fastDelivery,
        t.items.directCommunication
    ];

    items.forEach((item, index) => {
        if (itemsData[index]) {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            if (h3) h3.textContent = itemsData[index].title;
            if (p) p.textContent = itemsData[index].description;
        }
    });
}

// Update Process Section
function updateProcessSection(lang) {
    const t = translations[lang].process;
    const section = document.querySelector('.process');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;

    const steps = section.querySelectorAll('.step');
    const stepsData = [t.steps.step1, t.steps.step2, t.steps.step3, t.steps.step4];

    steps.forEach((step, index) => {
        if (stepsData[index]) {
            const h3 = step.querySelector('h3');
            const p = step.querySelector('p');
            if (h3) h3.textContent = stepsData[index].title;
            if (p) p.textContent = stepsData[index].description;
        }
    });
}

// Update Pricing Section
function updatePricingSection(lang) {
    const t = translations[lang].pricing;
    const section = document.querySelector('.pricing');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;

    // Update popular badge
    const popularBadge = section.querySelector('.popular-badge');
    if (popularBadge) popularBadge.textContent = t.popularBadge;

    // Update pricing cards
    const pricingCards = section.querySelectorAll('.pricing-card');
    const packagesData = [t.packages.landing, t.packages.vitrine, t.packages.platform];

    pricingCards.forEach((card, index) => {
        if (packagesData[index]) {
            const h3 = card.querySelector('h3');
            const description = card.querySelector('.pricing-description');
            const priceAmount = card.querySelector('.price-amount');
            const features = card.querySelectorAll('.pricing-features li');
            const btn = card.querySelector('.btn');

            if (h3) h3.textContent = packagesData[index].title;
            if (description) description.textContent = packagesData[index].description;

            // Update price text
            if (priceAmount && index < 2) {
                const amount = priceAmount.textContent.match(/\d+/);
                if (amount) {
                    priceAmount.textContent = `${t.startingFrom} ${amount[0]}`;
                }
            } else if (priceAmount && index === 2) {
                priceAmount.textContent = t.onQuote;
            }

            // Update features
            features.forEach((feature, fIndex) => {
                if (packagesData[index].features[fIndex]) {
                    const icon = feature.querySelector('i');
                    feature.textContent = packagesData[index].features[fIndex];
                    if (icon) feature.prepend(icon);
                }
            });

            // Update button text
            if (btn && index < 2) {
                btn.textContent = t.ctaStart;
            } else if (btn && index === 2) {
                btn.textContent = t.ctaContact;
            }
        }
    });

    // Update pricing info
    const pricingInfo = section.querySelector('.pricing-info p');
    if (pricingInfo) {
        const icon = pricingInfo.querySelector('i');
        pricingInfo.textContent = t.info;
        if (icon) pricingInfo.prepend(icon);
    }
}

// Update Projects Section
function updateProjectsSection(lang) {
    const t = translations[lang].projects;
    const section = document.querySelector('.projects');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;

    // Update filter buttons
    const filterBtns = section.querySelectorAll('.filter-btn');
    const filterTexts = [t.filters.all, t.filters.landing, t.filters.business, t.filters.platform];
    filterBtns.forEach((btn, index) => {
        if (filterTexts[index]) {
            btn.textContent = filterTexts[index];
        }
    });

    // Update project info labels
    const projectItems = section.querySelectorAll('.pro-item strong');
    projectItems.forEach(item => {
        const text = item.textContent.trim();
        if (text.includes('Objectif') || text.includes('Objective')) {
            item.textContent = t.labels.objective;
        } else if (text.includes('Solution')) {
            item.textContent = t.labels.solution;
        } else if (text.includes('Résultat') || text.includes('Result')) {
            item.textContent = t.labels.result;
        }
    });
}

// Update About Section
function updateAboutSection(lang) {
    const t = translations[lang].about;
    const section = document.querySelector('.about');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;

    const aboutText = section.querySelector('.about-text');
    if (aboutText) {
        const h3 = aboutText.querySelector('h3');
        const paragraphs = aboutText.querySelectorAll('p');

        if (h3) h3.textContent = t.subtitle;
        if (paragraphs[0]) {
            paragraphs[0].innerHTML = t.paragraph1.replace(
                'transformer vos idées en réalités numériques performantes',
                '<strong>' + (lang === 'fr' ? 'transformer vos idées en réalités numériques performantes' : 'transforming your ideas into high-performing digital realities') + '</strong>'
            );
        }
        if (paragraphs[1]) {
            paragraphs[1].innerHTML = t.paragraph2.replace(
                /Design, Développement Full Stack et Data Science|Design, Full Stack Development, and Data Science/,
                '<strong>' + (lang === 'fr' ? 'Design, Développement Full Stack et Data Science' : 'Design, Full Stack Development, and Data Science') + '</strong>'
            );
        }
        if (paragraphs[2]) {
            paragraphs[2].innerHTML = t.paragraph3.replace(
                /équipe dédiée|dedicated team/,
                '<strong>' + (lang === 'fr' ? 'équipe dédiée' : 'dedicated team') + '</strong>'
            );
        }
    }

    // Update stats labels
    const statLabels = section.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.stats.experts;
    if (statLabels[1]) statLabels[1].textContent = t.stats.support;
    if (statLabels[2]) statLabels[2].textContent = t.stats.power;

    const teamSpan = section.querySelector('.stat-number-span');
    if (teamSpan && teamSpan.textContent === 'Team') {
        teamSpan.textContent = t.stats.team;
    }
}

// Update Testimonials Section
function updateTestimonialsSection(lang) {
    const t = translations[lang].testimonials;
    const section = document.querySelector('.testimonials');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;
}

// Update Contact Section
function updateContactSection(lang) {
    const t = translations[lang].contact;
    const section = document.querySelector('.contact');
    if (!section) return;

    section.querySelector('.section-title').textContent = t.title;
    section.querySelector('.section-subtitle').textContent = t.subtitle;

    // Update contact info
    const contactItems = section.querySelectorAll('.contact-item h4');
    if (contactItems[0]) contactItems[0].textContent = t.info.email;
    if (contactItems[1]) contactItems[1].textContent = t.info.whatsapp;
    if (contactItems[2]) contactItems[2].textContent = t.info.location;

    const locationText = section.querySelector('.contact-item p');
    if (locationText) locationText.textContent = t.info.locationText;

    // Update form
    const form = section.querySelector('.contact-form');
    if (form) {
        const labels = form.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = t.form.nameLabel;
        if (labels[1]) labels[1].textContent = t.form.emailLabel;
        if (labels[2]) labels[2].textContent = t.form.projectLabel;
        if (labels[3]) labels[3].textContent = t.form.messageLabel;

        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');

        if (nameInput) nameInput.placeholder = t.form.namePlaceholder;
        if (emailInput) emailInput.placeholder = t.form.emailPlaceholder;
        if (messageInput) messageInput.placeholder = t.form.messagePlaceholder;

        // Update select options
        const select = form.querySelector('#subject');
        if (select) {
            const options = select.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.form.projectPlaceholder;
            if (options[1]) options[1].textContent = t.form.projectOptions.landing;
            if (options[2]) options[2].textContent = t.form.projectOptions.vitrine;
            if (options[3]) options[3].textContent = t.form.projectOptions.platform;
            if (options[4]) options[4].textContent = t.form.projectOptions.other;
        }

        const submitBtn = form.querySelector('button[type="submit"] span');
        if (submitBtn && !submitBtn.textContent.includes('...')) {
            submitBtn.textContent = t.form.submitButton;
        }
    }
}

// Update Footer Section
function updateFooterSection(lang) {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const t = translations[lang];

    // Update footer tagline
    const footerP = footer.querySelector('.footer-logo p');
    if (footerP) {
        footerP.textContent = lang === 'fr'
            ? 'Propulsez votre entreprise avec des solutions web modernes.'
            : 'Boost your business with modern web solutions.';
    }

    // Update footer links
    const footerLinks = footer.querySelectorAll('.footer-links a');
    const linkTexts = [
        t.nav.home,
        t.nav.services,
        t.nav.pricing,
        lang === 'fr' ? 'Réalisations' : 'Work',
        t.nav.about,
        t.nav.contact
    ];

    footerLinks.forEach((link, index) => {
        if (linkTexts[index]) {
            link.textContent = linkTexts[index];
        }
    });

    // Update copyright
    const copyright = footer.querySelector('.footer-bottom p');
    if (copyright) {
        copyright.textContent = lang === 'fr'
            ? '© 2026 AppNet. Tous droits réservés.'
            : '© 2026 AppNet. All rights reserved.';
    }
}

// Store notification messages for later use
function updateNotificationMessages(lang) {
    window.currentNotificationMessages = translations[lang].contact.notifications;
    window.currentFormMessages = translations[lang].contact.form;
}

// Language toggle event listener
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    changeLanguage(newLang);
    updateLangToggle(newLang);
});

// Initialize language on page load
initLanguage();

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Scroll Reveal Animations
// ===================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// Skills Marquee Duplication
// ===================================
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    const marqueeClone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(marqueeClone);
}

// ===================================
// Testimonials Slider
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dotsContainer = document.getElementById('testimonials-dots');

let currentTestimonial = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateTestimonials() {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show current testimonial
    if (testimonialCards[currentTestimonial]) {
        testimonialCards[currentTestimonial].style.display = 'block';
    }

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonials();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonials();
}

if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initial setup
updateTestimonials();

// Add dot styles dynamically
const style = document.createElement('style');
style.textContent = `
    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--glass-border);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .dot.active {
        background: var(--accent-primary);
        width: 30px;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// ===================================
// Contact Form Handling with EmailJS
// ===================================
const contactForm = document.getElementById('contact-form');

// Initialize EmailJS
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
(function () {
    emailjs.init("EAsq2pecWFl2IrI9F");
})();

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = `<span>${window.currentFormMessages?.sending || 'Envoi en cours...'}</span><i class="fas fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    try {
        // Send email using EmailJS sendForm
        // This takes the form element directy and uses the 'name' attributes:
        // 'name', 'email', 'subject', 'message'
        await emailjs.sendForm('service_icsyxqs', 'template_k1emtar', '#contact-form');

        // Show success message
        submitBtn.innerHTML = `<span>${window.currentFormMessages?.sent || 'Message envoyé!'}</span><i class="fas fa-check"></i>`;
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';

        // Reset form
        contactForm.reset();

        // Show success notification
        showNotification(window.currentNotificationMessages?.success || 'Merci! Votre message a été envoyé avec succès.', 'success');

    } catch (error) {
        console.error('EmailJS Error:', error);

        // Show error message on button
        submitBtn.innerHTML = `<span>${window.currentFormMessages?.error || 'Erreur!'}</span><i class="fas fa-exclamation-triangle"></i>`;
        submitBtn.style.background = '#ff4444';

        // Show error notification
        showNotification(window.currentNotificationMessages?.error || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
    } finally {
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// Form validation with visual feedback
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = 'var(--accent-primary)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--accent-primary)';
    });
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;

    if (type === 'success') {
        notification.style.borderColor = '#00ff88';
    }

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===================================
// Typing Effect for Hero
// ===================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000, suffix = '+') {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Observe stats section and trigger animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                const suffix = stat.textContent.includes('+') ? '+' : '';
                animateCounter(stat, targetValue, 2000, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe the stats container
const statsContainer = document.querySelector('.about-stats');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-gradient);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow-glow);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) return;

    circles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
};

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Project Filtering Logic
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.classList.remove('show');
                card.classList.add('hide');

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    }, 10);
                }
            });
        });
    });
}

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
    // Add initial animations
    document.body.classList.add('loaded');

    // Show all projects initially with animation
    projectCards.forEach(card => {
        card.classList.add('show');
    });

    // Trigger scroll reveal for elements in viewport
    revealOnScroll();

    console.log('Portfolio loaded successfully! 🚀');
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Bonjour! ', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cMerci de visiter mon portfolio!', 'font-size: 14px; color: #a855f7;');
console.log('%cSi vous cherchez un développeur Full Stack passionné, contactez-moi! 🚀', 'font-size: 12px; color: #b4b4b4;');
