/**
 * Analytics utilities for tracking page views and events
 */

export class AnalyticsManager {
  constructor(options = {}) {
    this.trackingId = options.trackingId;
    this.enableAnalytics = options.enableAnalytics || false;
    this.debug = options.debug || false;
  }

  /**
   * Track a page view
   */
  trackPageView(path, title = document.title) {
    if (!this.enableAnalytics) return;
    
    const fullPath = `/#/${path}`;
    
    if (this.debug) {
      console.log('Analytics: Page view', { path: fullPath, title });
    }
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag && this.trackingId) {
      window.gtag('config', this.trackingId, {
        page_path: fullPath,
        page_title: title
      });
      window.gtag('event', 'page_view', {
        page_path: fullPath,
        page_title: title
      });
    }
    
    // Plausible Analytics
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', {
        u: `${window.location.origin}${fullPath}`
      });
    }
    
    // Matomo/Piwik
    if (typeof window !== 'undefined' && window._paq) {
      window._paq.push(['setCustomUrl', fullPath]);
      window._paq.push(['setDocumentTitle', title]);
      window._paq.push(['trackPageView']);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName, parameters = {}) {
    if (!this.enableAnalytics) return;
    
    if (this.debug) {
      console.log('Analytics: Event', { eventName, parameters });
    }
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Plausible Analytics
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props: parameters });
    }
    
    // Matomo/Piwik
    if (typeof window !== 'undefined' && window._paq) {
      window._paq.push(['trackEvent', eventName, parameters.category || 'General', parameters.action || eventName]);
    }
  }

  /**
   * Track book reading events
   */
  trackBookEvent(action, bookData) {
    this.trackEvent('book_interaction', {
      action,
      book_type: bookData.type,
      book_slug: bookData.slug,
      chapter: bookData.chapter || null
    });
  }

  /**
   * Track navigation events
   */
  trackNavigation(from, to) {
    this.trackEvent('navigation', {
      from_path: from,
      to_path: to
    });
  }
}

// Default instance - Disabled by default for privacy
export const analytics = new AnalyticsManager({
  enableAnalytics: false, // Set to true when you want analytics
  debug: import.meta.env.DEV,
  trackingId: 'G-ZJGF6S026N' // Your GA4 ID ready for when you need it
});
