// Form submission handler with conversion tracking
function handleFormSubmit(event) {
    event.preventDefault();

    // Google Ads conversion tracking
    gtag('event', 'conversion', {
        'send_to': 'AW-11398569294/5cHACPyp9ZEYEO_Kzqsp'
    });

    // Google Analytics 4 event
    gtag('event', 'form_submission', {
        'event_category': 'Contact',
        'event_label': 'Quote Request'
    });

    // Submit the form
    event.target.submit();

    return false;
}
