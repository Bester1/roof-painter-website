// Unified tracking script for both page views and form submissions

// Initialize time tracking
const startTime = new Date();

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
    });

    return false;
}
