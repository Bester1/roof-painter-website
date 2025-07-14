# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static roofing services website for RoofMasters, a Cape Town-based company offering roof painting, cleaning, and waterproofing services. The site is deployed on Netlify with performance optimizations and comprehensive analytics tracking.

## Development Commands

Since this is a static website, there are no build tools or complex development commands. Local development is straightforward:

- **Local Development**: Open `index.html` directly in a browser or use a simple HTTP server
- **Testing**: No automated tests configured - manual testing in browser
- **Deployment**: Automatic deployment via Netlify when pushing to main branch
- **Dependencies**: Install Netlify plugins with `npm install` (optional, only needed for Netlify build optimization)

## Architecture & Structure

### Core Architecture
- **Type**: Static HTML/CSS/JS website
- **Deployment**: Netlify with automatic builds
- **Analytics**: Google Analytics 4 + Google Ads conversion tracking
- **Styling**: Custom CSS with CSS custom properties (CSS variables)
- **JavaScript**: Vanilla JS for form handling, smooth scrolling, and mobile menu

### File Structure
```
├── index.html              # Main landing page
├── contact.html            # Dedicated contact page
├── styles.css              # Global styles with CSS custom properties
├── script.js               # Main JavaScript functionality
├── services/               # Individual service pages
│   ├── roof-painting.html
│   ├── roof-cleaning.html
│   └── roof-waterproofing.html
├── js/
│   └── tracking.js         # Google Analytics and conversion tracking
├── images/                 # Image assets including company logo
│   └── Roof Masters logo.png  # Current company logo
└── netlify.toml           # Netlify configuration with plugins and headers
```

### Key Technologies
- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6+
- **Font**: Raleway (Google Fonts)
- **Icons**: Font Awesome 6.0
- **Analytics**: Google Analytics 4, Google Ads conversion tracking
- **Deployment**: Netlify with plugins for sitemap generation, caching, and HTML minification

### CSS Architecture
- Uses CSS custom properties for consistent theming
- Mobile-first responsive design
- Flexbox and CSS Grid for layouts
- CSS animations for smooth interactions

### JavaScript Features
- Smooth scrolling navigation
- Mobile hamburger menu with slide-out navigation and overlay
- Services dropdown menu in mobile navigation
- Form submission handling with conversion tracking
- Comprehensive analytics tracking (page views, form submissions, phone clicks, CTA clicks)
- Core Web Vitals performance tracking
- Scroll depth tracking
- Header shrinking effect on scroll

### Netlify Configuration
- Security headers (CSP with unsafe-eval for Google Analytics/Ads, X-Frame-Options, etc.)
- Static asset caching (1 year cache for CSS/JS/images)
- HTML minification in production
- Automatic sitemap generation
- SPA-style routing fallback to index.html
- Content Security Policy configured for Google Analytics, Google Ads, and CDN resources

## Key Implementation Notes

### Analytics Implementation
The site has comprehensive tracking via `js/tracking.js`:
- Google Analytics 4 (G-Y2QRM9PZSQ)
- Google Ads conversion tracking (AW-16799370310)
- Core Web Vitals monitoring
- Event tracking for forms, phone clicks, and CTA buttons

### Form Handling
Forms are set up with Netlify Forms for backend processing and include comprehensive tracking:
- Conversion tracking for Google Ads (AW-16799370310/NF8BCLOQ9-8ZEMaYyMo-)
- GA4 lead generation events
- Proper autocomplete attributes for accessibility
- Compact, centered submit buttons (max-width: 250px)
- Dedicated contact page with comprehensive contact information

### Mobile Responsiveness
The site uses a mobile-first approach with:
- Responsive navigation with hamburger menu (logo left, hamburger right)
- Slide-out mobile menu with Services dropdown
- Company logo image scaling (75px desktop -> 65px mobile)
- Flexible grid layouts
- Optimized touch targets
- Mobile-specific styling adjustments

### SEO Implementation
- Comprehensive meta tags and Open Graph data
- Structured HTML with semantic elements
- Optimized images with alt attributes
- XML sitemap generation via Netlify plugin
- Schema markup ready for implementation

## Content Management

### Current Content Status
- **Waterproofing**: Updated with Supa Rubber product information and benefits
- **Logo**: Company logo image implemented (Roof Masters logo.png)
- **Navigation**: Clean header with logo left, hamburger menu right
- **Contact**: Dedicated contact page with comprehensive information

### Content Updates Focus
- Add customer testimonials and reviews
- Expand FAQ sections on service pages
- Update service images with actual project photos
- Add before/after galleries
- Expand service area coverage details

When editing content, maintain the existing HTML structure and CSS classes to preserve styling and functionality.

## Important Notes for Future Development

### Navigation System
The current navigation has been extensively refined:
- **Desktop**: Logo left, no center button, hamburger menu right (works on all screen sizes)
- **Mobile**: Slide-out menu with Services dropdown
- **Consistent**: All pages use the same navigation structure

### Waterproofing Service
Uses Supa Rubber products - content reflects this with PVB formula mentions and specific benefits. However, some Supa Rubber brand mentions have been made generic per client request.

### Logo Implementation
- Logo scales responsively: 75px desktop (65px scrolled) to 65px mobile (55px scrolled)
- Uses image file: "Roof Masters logo.png"
- Proper alt text and accessibility

### Google Ads Ready
Site is fully configured for Google Ads campaigns with proper conversion tracking on all contact forms.