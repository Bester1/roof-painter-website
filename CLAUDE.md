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
├── styles.css              # Global styles with CSS custom properties
├── script.js               # Main JavaScript functionality
├── services/               # Individual service pages
│   ├── roof-painting.html
│   ├── roof-cleaning.html
│   └── roof-waterproofing.html
├── js/
│   └── tracking.js         # Google Analytics and conversion tracking
├── images/                 # Image assets and placeholders
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
- Mobile hamburger menu with overlay
- Form submission handling (currently shows alert, ready for backend integration)
- Comprehensive analytics tracking (page views, form submissions, phone clicks, CTA clicks)
- Core Web Vitals performance tracking

### Netlify Configuration
- Security headers (CSP, X-Frame-Options, etc.)
- Static asset caching (1 year cache for CSS/JS/images)
- HTML minification in production
- Automatic sitemap generation
- SPA-style routing fallback to index.html

## Key Implementation Notes

### Analytics Implementation
The site has comprehensive tracking via `js/tracking.js`:
- Google Analytics 4 (G-Y2QRM9PZSQ)
- Google Ads conversion tracking (AW-16799370310)
- Core Web Vitals monitoring
- Event tracking for forms, phone clicks, and CTA buttons

### Form Handling
Forms are set up with Netlify Forms attributes but currently show JavaScript alerts. When implementing backend functionality, the forms already have proper structure and tracking events.

### Mobile Responsiveness
The site uses a mobile-first approach with:
- Responsive navigation with hamburger menu
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

Content updates should focus on:
- Replacing placeholder images in `/images/` directory
- Updating service descriptions in individual service pages
- Adding customer testimonials
- Expanding FAQ sections

When editing content, maintain the existing HTML structure and CSS classes to preserve styling and functionality.