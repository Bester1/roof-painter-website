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
});
