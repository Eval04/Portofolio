// Mobile Navigation Toggle
class MobileNav {
  constructor() {
    this.nav = document.querySelector('nav');
    this.menuToggle = document.querySelector('#menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    
    if (this.menuToggle && this.navLinks) {
      this.init();
    }
  }

  init() {
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    this.navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.navLinks.classList.toggle('active');
    this.menuToggle.classList.toggle('active');
    this.menuToggle.setAttribute(
      'aria-expanded',
      this.navLinks.classList.contains('active')
    );
  }

  closeMenu() {
    this.navLinks.classList.remove('active');
    this.menuToggle.classList.remove('active');
    this.menuToggle.setAttribute('aria-expanded', 'false');
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const navHeight = document.querySelector('nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Parallax Hero Effect
class ParallaxHero {
  constructor() {
    this.hero = document.querySelector('header');
    
    if (this.hero) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const heroContent = this.hero.querySelector('.hero-content');
    
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - scrolled / 500;
    }
  }
}

// Intersection Observer for Reveal Animations
class RevealOnScroll {
  constructor() {
    this.sections = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    const options = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  }
}

// Animated Skill Progress
class SkillProgress {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.init();
  }

  init() {
    const options = {
      root: null,
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgress(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.skillBars.forEach(bar => {
      this.observer.observe(bar);
    });
  }

  animateProgress(bar) {
    const targetWidth = bar.getAttribute('data-progress') || '0';
    const progressFill = bar.querySelector('.skill-progress-fill');
    
    if (progressFill) {
      let currentWidth = 0;
      const increment = parseInt(targetWidth) / 50;
      
      const animation = setInterval(() => {
        currentWidth += increment;
        
        if (currentWidth >= parseInt(targetWidth)) {
          currentWidth = parseInt(targetWidth);
          clearInterval(animation);
        }
        
        progressFill.style.width = `${currentWidth}%`;
      }, 20);
    }
  }
}

// Animated Counters
class AnimatedCounter {
  constructor() {
    this.counters = document.querySelectorAll('.counter');
    this.init();
  }

  init() {
    const options = {
      root: null,
      threshold: 0.5
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.counters.forEach(counter => {
      this.observer.observe(counter);
    });
  }

  animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  }
}

// Hover Parallax for Project Cards
class ProjectCardParallax {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    const img = card.querySelector('img');
    if (img) {
      img.style.transform = `scale(1.1) translateZ(20px)`;
    }
  }

  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    const img = card.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1) translateZ(0)';
    }
  }
}

// Form Validation
class FormValidation {
  constructor() {
    this.form = document.querySelector('#contact-form');
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const name = this.form.querySelector('#name');
    const email = this.form.querySelector('#email');
    const message = this.form.querySelector('#message');
    
    let isValid = true;
    
    if (!this.validateField(name)) isValid = false;
    if (!this.validateField(email)) isValid = false;
    if (!this.validateField(message)) isValid = false;
    
    if (isValid) {
      this.showSuccess();
      this.form.reset();
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let errorMessage = '';
    
    if (value === '') {
      errorMessage = `${this.capitalizeFirst(fieldName)} is required`;
    } else if (fieldName === 'email' && !this.isValidEmail(value)) {
      errorMessage = 'Please enter a valid email address';
    } else if (fieldName === 'message' && value.length < 10) {
      errorMessage = 'Message must be at least 10 characters';
    }
    
    if (errorMessage) {
      this.showError(field, errorMessage);
      return false;
    } else {
      this.clearError(field);
      return true;
    }
  }

  showError(field, message) {
    this.clearError(field);
    
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
  }

  clearError(field) {
    field.classList.remove('error');
    
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    
    if (field.value.trim() !== '') {
      field.classList.add('success');
    } else {
      field.classList.remove('success');
    }
  }

  showSuccess() {
    const existingAlert = document.querySelector('.form-success-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'form-success-alert';
    alert.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✓</span>
        <span>Form successfully submitted!</span>
        <button class="close-alert">&times;</button>
      </div>
    `;
    
    this.form.parentElement.insertBefore(alert, this.form);
    
    const closeBtn = alert.querySelector('.close-alert');
    closeBtn.addEventListener('click', () => alert.remove());
    
    setTimeout(() => {
      if (alert.parentElement) {
        alert.remove();
      }
    }, 5000);
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Initialize all modules when DOM is ready
function init() {
  new MobileNav();
  new SmoothScroll();
  new ParallaxHero();
  new RevealOnScroll();
  new SkillProgress();
  new AnimatedCounter();
  new ProjectCardParallax();
  new FormValidation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
