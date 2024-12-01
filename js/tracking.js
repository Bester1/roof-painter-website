// Unified tracking script for both page views and form submissions

// Track page views and time on page
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    trackPageView();

    // Track time on page
    let startTime = new Date();
    window.addEventListener('beforeunload', function() {
        let endTime = new Date();
        let timeSpent = Math.round((endTime - startTime) / 1000);
        
        gtag('event', 'time_on_page', {
            'time_seconds': timeSpent,
            'page_title': document.title,
            'page_location': window.location.href
        });
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

    // Google Analytics 4 event - using standard event name
    gtag('event', 'generate_lead', {
        'form_name': 'quote_request',
        'form_destination': 'quote_submission',
        'form_submit': 'success'
    });

    // Google Ads conversion event for form submission
    gtag('event', 'conversion_event_submit_lead_form', {
        'send_to': 'AW-16799370310'
    });

    // Submit the form after tracking
    setTimeout(function() {
        event.target.submit();
    }, 500);

    return false;
}
