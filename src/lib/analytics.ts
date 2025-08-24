// src/lib/analytics.ts

// Define types for form data and gtag parameters
interface CalculatorFormData {
  currentAge: number;
  currentSavings: number;
  retirementAge: number;
  [key: string]: unknown;
}

interface GtagEventParameters {
  event_category?: string;
  event_label?: string;
  custom_parameters?: Record<string, unknown>;
  [key: string]: unknown;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: GtagEventParameters) => void;
  }
}

// Track calculator usage
export const trackCalculatorUse = (formData: CalculatorFormData) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculator_used', {
      event_category: 'engagement',
      event_label: 'coast_fire_calculator',
      custom_parameters: {
        age: formData.currentAge,
        savings: formData.currentSavings,
        retirement_age: formData.retirementAge
      }
    });
  }
};

// Track email signups
export const trackEmailSignup = (source: 'homepage' | 'calculator') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_signup', {
      event_category: 'lead_generation',
      event_label: source,
    });
  }
};

// Track blog post views
export const trackBlogView = (postTitle: string, slug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'blog_view', {
      event_category: 'content',
      event_label: slug,
      custom_parameters: {
        post_title: postTitle
      }
    });
  }
};

// Track email results sent
export const trackEmailResults = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_results_sent', {
      event_category: 'engagement',
      event_label: 'calculator_results'
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      custom_parameters: {
        location: location
      }
    });
  }
};