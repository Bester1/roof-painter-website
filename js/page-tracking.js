// Track page views and time on page
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    trackPageView();

    // Track Google Ads conversion for page view
    gtag('event', 'conversion', {
        'send_to': 'AW-11398569294/REPLACE_WITH_YOUR_LABEL'  // Replace this with your conversion label
    });

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

function trackPageView() {
    gtag('event', 'page_view', {
        'page_title': document.title,
        'page_location': window.location.href,
        'send_to': ['G-Y2QRM9PZSQ', 'AW-11398569294']
    });
}
