document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            
            // Show success message (in a real implementation, you would send this data to a server)
            alert('Thank you for your inquiry! We will contact you shortly.');
            form.reset();
        });
    }

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        alert('Thank you for your inquiry! We will contact you shortly.');
        form.reset();
        return false;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    document.querySelectorAll('.benefit-card, .service-card, .testimonial-card').forEach(
        element => observer.observe(element)
    );

    // Google Analytics Event Tracking
    function trackEvent(category, action, label) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

    // Form submission tracking
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        trackEvent('Contact', 'Form Submit', 'Quote Request');
    });

    // Phone number click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(function(elem) {
        elem.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.href.replace('tel:', ''));
        });
    });

    // Service card click tracking
    document.querySelectorAll('.service-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            trackEvent('Services', 'View Service', serviceName);
        });
    });

    // CTA button click tracking
    document.querySelectorAll('.cta-button, .nav-cta, .submit-button').forEach(function(button) {
        button.addEventListener('click', function() {
            trackEvent('CTA', 'Click', this.textContent.trim());
        });
    });

    // Scroll depth tracking
    let scrollDepthTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrollPos = window.scrollY;
        const scrollPercent = (scrollPos / docHeight) * 100;

        Object.keys(scrollDepthTracked).forEach(function(depth) {
            if (!scrollDepthTracked[depth] && scrollPercent >= depth) {
                scrollDepthTracked[depth] = true;
                trackEvent('Scroll', 'Scroll Depth', depth + '%');
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');

    function toggleMenu() {
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    }

    function closeMenuHandler() {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMenuHandler();
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu .nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenuHandler();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenuHandler();
        }
    });

    // Header shrink on scroll for mobile
    const header = document.querySelector('.header');
    const adjustBodyPadding = () => {
        document.body.style.paddingTop = header.offsetHeight + 'px';
    };

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Initial adjustment
    adjustBodyPadding();

    // Adjust on window resize
    window.addEventListener('resize', adjustBodyPadding);

    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrollPos = window.scrollY;
        const scrollPercent = (scrollPos / docHeight) * 100;

        Object.keys(scrollDepthTracked).forEach(function(depth) {
            if (!scrollDepthTracked[depth] && scrollPercent >= depth) {
                scrollDepthTracked[depth] = true;
                trackEvent('Scroll', 'Scroll Depth', depth + '%');
            }
        });

        if (window.innerWidth <= 768) { // Apply only on mobile
            if (scrollPos > 50) { // Adjust this value as needed
                if (!header.classList.contains('header-shrink')) {
                    header.classList.add('header-shrink');
                    adjustBodyPadding(); // Re-adjust padding after shrink
                }
            } else {
                if (header.classList.contains('header-shrink')) {
                    header.classList.remove('header-shrink');
                    adjustBodyPadding(); // Re-adjust padding after un-shrink
                }
            }
        }
    });
});