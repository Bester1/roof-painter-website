// Unified tracking script for both page views and form submissions

// Initialize time tracking
const startTime = new Date();
let firstContentfulPaint = 0;

// Performance tracking
if ('PerformanceObserver' in window) {
    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            gtag('event', 'web_vitals', {
                'event_category': 'Performance',
                'event_label': 'FID',
                'value': Math.round(entry.processingStart - entry.startTime)
            });
        }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Track Time to First Byte (TTFB)
    const navigationObserver = new PerformanceObserver((entryList) => {
        const navigation = entryList.getEntries()[0];
        gtag('event', 'web_vitals', {
            'event_category': 'Performance',
            'event_label': 'TTFB',
            'value': Math.round(navigation.responseStart - navigation.requestStart)
        });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });

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

    // Track Long Tasks
    const longTaskObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            gtag('event', 'web_vitals', {
                'event_category': 'Performance',
                'event_label': 'LongTask',
                'value': Math.round(entry.duration),
                'task_name': entry.name,
                'task_attribution': JSON.stringify(entry.attribution)
            });
        }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // Track Resource Loading Performance
    const resourceObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css') {
                gtag('event', 'resource_timing', {
                    'event_category': 'Performance',
                    'event_label': entry.initiatorType,
                    'resource_name': entry.name,
                    'duration': Math.round(entry.duration),
                    'transfer_size': entry.transferSize,
                    'encoded_size': entry.encodedBodySize
                });
            }
        }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
}

// Track Memory Usage if available
if (window.performance && performance.memory) {
    setInterval(() => {
        gtag('event', 'memory_usage', {
            'event_category': 'Performance',
            'used_js_heap': Math.round(performance.memory.usedJSHeapSize / 1048576), // Convert to MB
            'total_js_heap': Math.round(performance.memory.totalJSHeapSize / 1048576),
            'heap_limit': Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        });
    }, 30000); // Check every 30 seconds
}

// Track Network Information if available
if ('connection' in navigator) {
    const connection = navigator.connection;
    
    function sendNetworkInfo() {
        gtag('event', 'network_info', {
            'event_category': 'Performance',
            'effective_type': connection.effectiveType,
            'downlink': connection.downlink,
            'rtt': connection.rtt,
            'save_data': connection.saveData
        });
    }

    // Send initial network info
    sendNetworkInfo();

    // Track network changes
    connection.addEventListener('change', sendNetworkInfo);
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
document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    
    // Track page load timing
    window.addEventListener('load', () => {
        const pageLoadTime = performance.now();
        gtag('event', 'page_load_time', {
            'event_category': 'Performance',
            'value': Math.round(pageLoadTime),
            'page_url': window.location.href
        });
    });
});

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

    // Record form interaction timing
    const formInteractionTime = performance.now();
    
    // Track both GA4 and Google Ads events
    Promise.all([
        // GA4 lead generation event
        gtag('event', 'generate_lead', {
            'form_name': 'quote_request',
            'form_destination': 'quote_submission',
            'form_submit': 'success',
            'interaction_time': Math.round(formInteractionTime)
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
