// Portfolio JavaScript - Vanilla JS
// Main functionality for interactive features

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality when DOM is ready
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initProjectCards();
    initScrollAnimations();
    initSkillProgressBars();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
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

// Contact form submission and validation
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        // Add real-time validation
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                console.log('Form submitted:', data);
                showSuccessAlert();
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('error', 'success');
                    const errorEl = document.getElementById(input.id + '-error');
                    if (errorEl) errorEl.style.display = 'none';
                });
            }
        });
    }
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    const errorEl = document.getElementById(field.id + '-error');
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        isValid = false;
        errorMessage = `${field.placeholder.split(' ')[0]} is required`;
    } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.name === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }
    
    // Update UI
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        if (errorEl) errorEl.style.display = 'none';
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        if (errorEl) {
            errorEl.textContent = errorMessage;
            errorEl.style.display = 'block';
        }
    }
    
    return isValid;
}

// Show success alert
function showSuccessAlert() {
    const form = document.querySelector('.contact-form');
    const alert = document.createElement('div');
    alert.className = 'form-success-alert';
    alert.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <span class="success-text">Thank you for your message! I will get back to you soon.</span>
        </div>
        <button type="button" class="close-alert" aria-label="Close alert">&times;</button>
    `;
    
    form.parentElement.insertBefore(alert, form);
    
    // Close button functionality
    alert.querySelector('.close-alert').addEventListener('click', () => {
        alert.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
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

// Intersection Observer for reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Trigger skill progress bars if they're in this container
                const skillCards = entry.target.querySelectorAll('.skill-card');
                if (skillCards.length > 0) {
                    skillCards.forEach(card => {
                        card.classList.add('reveal-visible');
                        updateSkillProgressBar(card);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe reveal elements
    const revealElements = document.querySelectorAll('.reveal, .skill-card');
    revealElements.forEach(el => observer.observe(el));
}

// Update skill progress bars with animation
function updateSkillProgressBar(skillCard) {
    const progressBar = skillCard.querySelector('.skill-progress-fill');
    const progressContainer = skillCard.querySelector('.skill-progress');
    
    if (progressBar && progressContainer) {
        const progress = progressContainer.getAttribute('data-progress') || '0';
        const delay = Math.random() * 0.3;
        
        setTimeout(() => {
            progressBar.style.width = progress + '%';
        }, delay * 1000);
    }
}

// Initialize skill progress bars
function initSkillProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressContainer = card.querySelector('.skill-progress');
        if (progressContainer && progressContainer.getAttribute('data-progress')) {
            const progress = progressContainer.getAttribute('data-progress');
            const fill = card.querySelector('.skill-progress-fill');
            if (fill) {
                // Start at 0, will animate on reveal
                fill.style.width = '0%';
            }
        }
    });
}
