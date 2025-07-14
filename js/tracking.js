// Unified Tracking Script for Google Analytics 4 and Google Ads

// Initialize dataLayer and gtag with error handling
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Safe gtag wrapper that handles blocked analytics
function safeGtag() {
    if (typeof gtag === 'function') {
        try {
            gtag.apply(this, arguments);
        } catch (e) {
            console.warn('Analytics blocked or failed:', e);
        }
    }
}

// Initialize analytics if available
try {
    gtag('js', new Date());
    gtag('config', 'G-Y2QRM9PZSQ');
    gtag('config', 'AW-16799370310');
} catch (e) {
    console.warn('Analytics initialization failed:', e);
}

// --- Core Web Vitals and Performance Tracking ---

// Function to send web vitals data
function sendWebVitals(metric) {
    safeGtag('event', 'web_vitals', {
        'event_category': 'Performance',
        'event_label': metric.name,
        'value': Math.round(metric.value),
        'metric_id': metric.id
    });
}

// Track Core Web Vitals
if (performance && performance.getEntriesByType) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            sendWebVitals({
                name: entry.name,
                value: entry.startTime,
                id: entry.id
            });
        }
    });
    observer.observe({type: 'largest-contentful-paint', buffered: true});
    observer.observe({type: 'first-input', buffered: true});
    observer.observe({type: 'layout-shift', buffered: true});
}


// --- Event Tracking ---

// Track page views
safeGtag('event', 'page_view', {
    'page_title': document.title,
    'page_location': window.location.href,
    'send_to': ['G-Y2QRM9PZSQ', 'AW-16799370310']
});

// Track form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Google Ads Conversion
    safeGtag('event', 'conversion', {'send_to': 'AW-16799370310/NF8BCLOQ9-8ZEMaYyMo-'});

    // GA4 Lead Generation Event
    safeGtag('event', 'generate_lead', {
        'form_name': 'quote_request',
        'form_destination': 'quote_submission'
    });

    // Submit the form after a short delay
    setTimeout(function() {
        event.target.submit();
    }, 500);
}

// Track phone number clicks
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            safeGtag('event', 'phone_click', {
                'event_category': 'Contact',
                'event_label': link.href
            });
        });
    });
});

// Track CTA clicks
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .nav-cta, .submit-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            safeGtag('event', 'cta_click', {
                'event_category': 'CTA',
                'event_label': button.textContent.trim()
            });
        });
    });
});
