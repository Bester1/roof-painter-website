// Google Analytics 4 Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Basic pageview tracking
gtag('config', 'G-Y2QRM9PZSQ', {
    'page_title': 'Home',
    'send_page_view': true
});

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Quote Request'
            });
        });
    }
});

// Track phone number clicks
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(function(phone) {
        phone.addEventListener('click', function() {
            gtag('event', 'phone_click', {
                'event_category': 'Contact',
                'event_label': phone.textContent
            });
        });
    });
});

// Track scroll depth
let scrollDepthTracked = {};
window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    
    const depths = [25, 50, 75, 100];
    depths.forEach(function(depth) {
        if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': depth + '%'
            });
            scrollDepthTracked[depth] = true;
        }
    });
});
