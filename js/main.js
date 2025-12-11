// Portfolio JavaScript - Enhanced Vanilla JS Implementation
// All interactions without external libraries

// ============================================
// PERSONAL CONSTANTS
// ============================================
const PERSONAL = {
  name: 'Ival Permana',
  email: 'ivalpermana004@gmail.com',
  github: 'eval04',
  githubUrl: 'https://github.com/eval04',
  projectUrl: 'https://eval04.github.io/Galery/',
  formSubmitUrl: 'https://formsubmit.co/ajax/ivalpermana004@gmail.com'
};

// ============================================
// UTILITY: REDUCED MOTION CHECK
// ============================================
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ============================================
// MOBILE NAVIGATION TOGGLE WITH ARIA UPDATES
// ============================================
class MobileNavigation {
  constructor() {
    this.menuToggle = document.querySelector('#menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    
    if (this.menuToggle && this.navLinks) {
      this.init();
    }
  }

  init() {
    // Toggle menu on click
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when a link is clicked
    this.navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navLinks.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isActive = this.navLinks.classList.contains('active');
    
    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navLinks.classList.add('active');
    this.menuToggle.classList.add('active');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    
    // Trap focus in menu for accessibility
    const firstLink = this.navLinks.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  closeMenu() {
    this.navLinks.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
  }
}

// ============================================
// SMOOTH SCROLLING WITH NAV OFFSET
// ============================================
class SmoothScroller {
  constructor() {
    this.nav = document.querySelector('nav');
    this.init();
  }

  init() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Ignore empty fragments
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      });
    });
  }

  scrollToElement(element) {
    const navHeight = this.nav ? this.nav.offsetHeight : 0;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
    
    // Use instant scroll if user prefers reduced motion
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    
    window.scrollTo({
      top: targetPosition,
      behavior: behavior
    });
  }
}

// ============================================
// INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
// ============================================
class RevealOnScroll {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    
    if (this.revealElements.length > 0) {
      this.init();
    }
  }

  init() {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      this.revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }
    
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after revealing to improve performance
          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.revealElements.forEach(element => {
      this.observer.observe(element);
    });
  }
}

// ============================================
// ANIMATED SKILL PROGRESS BARS
// ============================================
class SkillProgressAnimator {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-progress');
    
    if (this.skillBars.length > 0) {
      this.init();
    }
  }

  init() {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      this.skillBars.forEach(bar => this.setProgressInstantly(bar));
      return;
    }
    
    const observerOptions = {
      root: null,
      threshold: 0.5,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgress(entry.target);
          // Trigger only once
          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.skillBars.forEach(bar => {
      this.observer.observe(bar);
    });
  }

  setProgressInstantly(bar) {
    const targetWidth = bar.getAttribute('data-progress') || '0';
    const progressFill = bar.querySelector('.skill-progress-fill');
    
    if (progressFill) {
      progressFill.style.width = `${targetWidth}%`;
    }
  }

  animateProgress(bar) {
    const targetWidth = parseInt(bar.getAttribute('data-progress') || '0');
    const progressFill = bar.querySelector('.skill-progress-fill');
    
    if (!progressFill) return;
    
    let currentWidth = 0;
    const duration = 1000; // 1 second
    const increment = targetWidth / (duration / 16); // 60fps
    
    const animate = () => {
      currentWidth += increment;
      
      if (currentWidth >= targetWidth) {
        progressFill.style.width = `${targetWidth}%`;
        return;
      }
      
      progressFill.style.width = `${currentWidth}%`;
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
class ContactFormController {
  constructor() {
    this.form = document.querySelector('#contact-form');
    
    if (!this.form) {
      this.form = document.querySelector('.contact-form');
    }
    
    if (this.form) {
      this.isSubmitting = false;
      this.init();
    }
  }

  init() {
    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation on blur
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Prevent double submission
    if (this.isSubmitting) return;
    
    // Get form fields
    const nameField = this.form.querySelector('#name');
    const emailField = this.form.querySelector('#email');
    const messageField = this.form.querySelector('#message');
    
    // Validate all fields
    let isValid = true;
    if (!this.validateField(nameField)) isValid = false;
    if (!this.validateField(emailField)) isValid = false;
    if (!this.validateField(messageField)) isValid = false;
    
    if (!isValid) return;
    
    // Get form data
    const formData = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      message: messageField.value.trim()
    };
    
    // Submit form
    this.isSubmitting = true;
    this.showSubmittingState();
    
    try {
      await this.submitToFormSubmit(formData);
      this.showSuccessToast('Message sent successfully! I\'ll get back to you soon.');
      this.form.reset();
      this.clearAllErrors();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorToast('Failed to send message. Please try again or use the email link below.');
      this.showMailtoFallback(formData);
    } finally {
      this.isSubmitting = false;
      this.hideSubmittingState();
    }
  }

  async submitToFormSubmit(formData) {
    const response = await fetch(PERSONAL.formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Form submission unsuccessful');
    }
    
    return data;
  }

  validateField(field) {
    if (!field) return false;
    
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let errorMessage = '';
    
    // Check if empty
    if (value === '') {
      errorMessage = `${this.capitalizeFirst(fieldName)} is required`;
    }
    // Validate email format
    else if (fieldName === 'email' && !this.isValidEmail(value)) {
      errorMessage = 'Please enter a valid email address';
    }
    // Validate minimum message length
    else if (fieldName === 'message' && value.length < 10) {
      errorMessage = 'Message must be at least 10 characters long';
    }
    
    if (errorMessage) {
      this.showFieldError(field, errorMessage);
      return false;
    } else {
      this.clearFieldError(field);
      field.classList.add('success');
      return true;
    }
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    field.parentElement.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    
    // Add success state if field has value
    if (field.value.trim() !== '') {
      field.classList.add('success');
    } else {
      field.classList.remove('success');
    }
  }

  clearAllErrors() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.classList.remove('error', 'success');
      const errorDiv = input.parentElement.querySelector('.error-message');
      if (errorDiv) errorDiv.remove();
    });
  }

  showSuccessToast(message) {
    this.removeExistingToasts();
    
    const toast = document.createElement('div');
    toast.className = 'form-success-alert';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div class="success-content">
        <span class="success-icon" aria-hidden="true">✓</span>
        <span>${message}</span>
        <button class="close-alert" aria-label="Close notification">&times;</button>
      </div>
    `;
    
    this.form.parentElement.insertBefore(toast, this.form);
    
    // Close button handler
    const closeBtn = toast.querySelector('.close-alert');
    closeBtn.addEventListener('click', () => toast.remove());
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  }

  showErrorToast(message) {
    this.removeExistingToasts();
    
    const toast = document.createElement('div');
    toast.className = 'form-success-alert';
    toast.style.backgroundColor = '#ef4444';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.innerHTML = `
      <div class="success-content">
        <span class="success-icon" aria-hidden="true">✕</span>
        <span>${message}</span>
        <button class="close-alert" aria-label="Close notification">&times;</button>
      </div>
    `;
    
    this.form.parentElement.insertBefore(toast, this.form);
    
    // Close button handler
    const closeBtn = toast.querySelector('.close-alert');
    closeBtn.addEventListener('click', () => toast.remove());
    
    // Auto-remove after 7 seconds (longer for error)
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 7000);
  }

  removeExistingToasts() {
    const existingToasts = document.querySelectorAll('.form-success-alert');
    existingToasts.forEach(toast => toast.remove());
  }

  showSubmittingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
  }

  hideSubmittingState() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  }

  showMailtoFallback(formData) {
    const subject = encodeURIComponent('Contact Form Message');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
    
    // Create fallback link
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.marginTop = '1rem';
    fallbackDiv.style.padding = '1rem';
    fallbackDiv.style.backgroundColor = '#f3f4f6';
    fallbackDiv.style.borderRadius = '0.5rem';
    fallbackDiv.innerHTML = `
      <p style="margin-bottom: 0.5rem;">Or send email directly:</p>
      <a href="${mailtoLink}" style="color: #3b82f6; text-decoration: underline;">
        Open Email Client
      </a>
    `;
    
    // Remove existing fallback if any
    const existingFallback = this.form.parentElement.querySelector('.mailto-fallback');
    if (existingFallback) existingFallback.remove();
    
    fallbackDiv.className = 'mailto-fallback';
    this.form.parentElement.appendChild(fallbackDiv);
  }

  isValidEmail(email) {
    // RFC 5322 simplified email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// ============================================
// PROJECT CARD HOVER EFFECTS
// ============================================
class ProjectCardEffects {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    
    if (this.cards.length > 0 && !prefersReducedMotion()) {
      this.init();
    }
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseEnter(card) {
    const img = card.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1.1)';
      img.style.transition = 'transform 0.3s ease-in-out';
    }
  }

  handleMouseLeave(card) {
    const img = card.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  }
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
function initializePortfolio() {
  // Initialize all features
  new MobileNavigation();
  new SmoothScroller();
  new RevealOnScroll();
  new SkillProgressAnimator();
  new ContactFormController();
  new ProjectCardEffects();
  
  // Log initialization (remove in production if needed)
  console.log('Portfolio initialized successfully');
  console.log('Reduced motion:', prefersReducedMotion());
}

// ============================================
// DOM READY HANDLER
// ============================================
if (document.readyState === 'loading') {
  // DOM still loading, wait for DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  // DOM already loaded, initialize immediately
  initializePortfolio();
}
