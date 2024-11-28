// Form submission handler with conversion tracking
function handleFormSubmit(event) {
    event.preventDefault();

    // Google Analytics 4 event - using standard event name
    gtag('event', 'generate_lead', {
        'form_name': 'quote_request',
        'form_destination': 'quote_submission',
        'form_submit': 'success'
    });

    // Submit the form after tracking
    setTimeout(function() {
        event.target.submit();
    }, 500);

    return false;
}
