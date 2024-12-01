// Unified tracking script for both page views and form submissions

// Initialize time tracking
const startTime = new Date();
let firstContentfulPaint = 0;

// Performance tracking
if ('PerformanceObserver' in window) {
    // Track First Contentful Paint (FCP)
    const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
                firstContentfulPaint = entry.startTime;
                gtag('event', 'web_vitals', {
                    'event_category': 'Performance',
                    'event_label': 'FCP',
                    'value': Math.round(firstContentfulPaint)
                });
            }
        }
    });
    paintObserver.observe({ entryTypes: ['paint'] });

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        gtag('event', 'web_vitals', {
            'event_category': 'Performance',
            'event_label': 'LCP',
            'value': Math.round(lastEntry.startTime)
        });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        }
        gtag('event', 'web_vitals', {
            'event_category': 'Performance',
            'event_label': 'CLS',
            'value': Math.round(clsValue * 1000) / 1000
        });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
}

// Error tracking
window.addEventListener('error', function(e) {
    gtag('event', 'javascript_error', {
        'event_category': 'Error',
        'event_label': e.message,
        'error_url': e.filename,
        'error_line': e.lineno,
        'error_column': e.colno,
        'error_stack': e.error ? e.error.stack : ''
    });
    return false;
});

// Promise error tracking
window.addEventListener('unhandledrejection', function(e) {
    gtag('event', 'javascript_error', {
        'event_category': 'Error',
        'event_label': 'Unhandled Promise Rejection',
        'error_message': e.reason,
        'error_type': 'promise_rejection'
    });
});

// Track page views and time on page
document.addEventListener('DOMContentLoaded', trackPageView);

// Track time on page when user leaves
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((new Date() - startTime) / 1000);
    gtag('event', 'time_on_page', {
        'time_seconds': timeSpent,
        'page_title': document.title,
        'page_location': window.location.href
    });
});

// Page view tracking function
function trackPageView() {
    gtag('event', 'page_view', {
        'page_title': document.title,
        'page_location': window.location.href,
        'send_to': ['G-Y2QRM9PZSQ', 'AW-16799370310']
    });
}

// Form submission handler with conversion tracking
function handleFormSubmit(event) {
    event.preventDefault();

    // Track both GA4 and Google Ads events
    Promise.all([
        // GA4 lead generation event
        gtag('event', 'generate_lead', {
            'form_name': 'quote_request',
            'form_destination': 'quote_submission',
            'form_submit': 'success'
        }),
        // Google Ads conversion event
        gtag('event', 'conversion', {
            'send_to': 'AW-16799370310/NF8BCLOQ9-8ZEMaYyMo-'
        })
    ]).then(() => {
        // Submit form after tracking (small delay to ensure tracking completes)
        setTimeout(() => event.target.submit(), 250);
    }).catch(error => {
        // Track failed form submission
        gtag('event', 'form_error', {
            'event_category': 'Error',
            'event_label': 'Form Submission Failed',
            'error_message': error.message
        });
        // Still submit the form even if tracking fails
        event.target.submit();
    });

    return false;
}
