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
    submitBtn.innerHTML = '<span>Envoi en cours...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        // Send email using EmailJS sendForm
        // This takes the form element directy and uses the 'name' attributes:
        // 'name', 'email', 'subject', 'message'
        await emailjs.sendForm('service_esaydkt', 'template_bjsvnxr', '#contact-form');

        // Show success message
        submitBtn.innerHTML = '<span>Message envoyé!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)';

        // Reset form
        contactForm.reset();

        // Show success notification
        showNotification('Merci! Votre message a été envoyé avec succès.', 'success');

    } catch (error) {
        console.error('EmailJS Error:', error);

        // Show error message on button
        submitBtn.innerHTML = '<span>Erreur!</span><i class="fas fa-exclamation-triangle"></i>';
        submitBtn.style.background = '#ff4444';

        // Show error notification
        showNotification('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
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
