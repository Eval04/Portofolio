// Portfolio JavaScript - Vanilla JS
// Main functionality for interactive features

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality when DOM is ready
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initProjectCards();
    initScrollIndicator();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form submission
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Placeholder for form submission
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            
            form.reset();
        });
    }
}

// Project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const img = card.querySelector('img');
        
        if (img) {
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.3s ease-in-out';
            });
            
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Utility: Intersection Observer for animations (placeholder)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements (to be implemented with CSS animations)
    const elements = document.querySelectorAll('section');
    elements.forEach(el => observer.observe(el));
}
