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

    // All analytics tracking is now handled in tracking.js
    // This prevents duplicate tracking and reduces errors

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

    // Modern Navigation System
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-menu .nav-links a');

    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    // Mobile menu functions
    function openMobileMenu() {
        navMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Handle dropdown toggle
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });
    }
    
    // Close menu when dropdown links are clicked
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Handle scroll events
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });

    // Initialize header state
    updateHeader();

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        adjustBodyPadding();
    });

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Adjust body padding for fixed header
    function adjustBodyPadding() {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }

    // Initial padding adjustment
    adjustBodyPadding();
});