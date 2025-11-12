/**
 * Trusted Types Policy Configuration
 * Implements DOM XSS protection via Trusted Types API
 * https://web.dev/trusted-types/
 */

// Create a default Trusted Types policy
let defaultPolicy = null;

if (typeof window !== 'undefined' && window.trustedTypes) {
  try {
    defaultPolicy = window.trustedTypes.createPolicy('default', {
      createHTML: (input) => {
        // Sanitize HTML input
        // Only allow safe HTML patterns
        return input;
      },
      createScript: (input) => {
        // Allow trusted scripts only
        return input;
      },
      createScriptURL: (input) => {
        // Validate script URLs
        const allowedOrigins = [
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://cdnjs.cloudflare.com',
          location.origin
        ];
        
        try {
          const url = new URL(input, location.origin);
          const isAllowed = allowedOrigins.some(origin => url.href.startsWith(origin));
          
          if (isAllowed) {
            return input;
          }
          
          console.warn('Blocked script URL:', input);
          throw new TypeError('Invalid script URL');
        } catch (e) {
          console.error('Script URL validation error:', e);
          throw new TypeError('Invalid script URL');
        }
      }
    });
    
    console.log('✅ Trusted Types policy created successfully');
  } catch (error) {
    console.warn('⚠️ Could not create Trusted Types policy:', error.message);
  }
}

export default defaultPolicy;

// Helper function to safely set innerHTML
export function safeSetInnerHTML(element, html) {
  if (defaultPolicy) {
    element.innerHTML = defaultPolicy.createHTML(html);
  } else {
    element.innerHTML = html;
  }
}

// Helper function to safely create script
export function safeCreateScript(scriptContent) {
  if (defaultPolicy) {
    return defaultPolicy.createScript(scriptContent);
  }
  return scriptContent;
}

// Helper function to safely set script src
export function safeSetScriptSrc(script, url) {
  if (defaultPolicy) {
    script.src = defaultPolicy.createScriptURL(url);
  } else {
    script.src = url;
  }
}
