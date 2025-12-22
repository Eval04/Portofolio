        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        });

        // Dark Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            htmlElement.classList.add('light-mode');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('light-mode');
            const isLightMode = htmlElement.classList.contains('light-mode');
            themeToggle.textContent = isLightMode ? '☀️' : '🌙';
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        });

        function countUp(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }

        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('[data-count]').forEach(el => {
                        if (el.textContent === '0') countUp(el, parseInt(el.dataset.count));
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        observer.observe(document.getElementById('stats'));

        let currentTestimonial = 0;
        let autoCarouselInterval;

        function showTestimonial(n) {
            const testimonials = document.querySelectorAll('.testimonial');
            if (n >= testimonials.length) currentTestimonial = 0;
            if (n < 0) currentTestimonial = testimonials.length - 1;
            testimonials.forEach(t => t.classList.remove('active'));
            testimonials[currentTestimonial].classList.add('active');
        }

        function startAutoCarousel() {
            autoCarouselInterval = setInterval(() => {
                currentTestimonial++;
                showTestimonial(currentTestimonial);
            }, 5000);
        }

        startAutoCarousel();

        const projects = [
            { title: 'Network Security Audit Platform', desc: 'Aplikasi penetration testing terintegrasi dengan automated reporting dan compliance check', tech: 'Python, Node.js, React', status: 'Active' },
            { title: 'E-Commerce Platform', desc: 'Website e-commerce full-stack dengan payment gateway, inventory management, dan analytics dashboard real-time', tech: 'React, Node.js, PostgreSQL, Stripe', status: 'Completed' },
            { title: 'Mobile Fitness App', desc: 'Aplikasi fitness dengan tracking workout, nutrition planning, dan social community features yang engaging', tech: 'Flutter, Firebase, Dart', status: 'Completed' }
        ];

        function openModal(index) {
            const proj = projects[index];
            document.getElementById('modalTitle').textContent = proj.title;
            document.getElementById('modalDesc').textContent = proj.desc;
            document.getElementById('modalTech').textContent = proj.tech;
            document.getElementById('modalStatus').textContent = proj.status;
            document.getElementById('projectModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('projectModal').style.display = 'none';
        }

        window.onclick = (event) => {
            const modal = document.getElementById('projectModal');
            if (event.target === modal) modal.style.display = 'none';
        };

        // Navbar Hamburger Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Active section tracking for vertical scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 150;
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        });

        // Smooth scroll
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

        // Section animation trigger on scroll
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
