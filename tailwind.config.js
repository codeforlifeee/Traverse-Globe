/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'season': ['"The Seasons"', '"Playfair Display"', 'serif'],
        'poppins': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'canva-sans': ['"Canva Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Revamp type scale — see REVAMP_PLAN §6.2
        'kicker': ['0.75rem', { lineHeight: '1.1', letterSpacing: '0.14em', fontWeight: '600' }],
        'kicker-lg': ['0.875rem', { lineHeight: '1.1', letterSpacing: '0.14em', fontWeight: '600' }],
        'display': ['clamp(1.875rem, 4.6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['clamp(1.75rem, 3.2vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 2.4vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['clamp(1.25rem, 1.8vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['clamp(1.0625rem, 1.3vw, 1.125rem)', { lineHeight: '1.65' }],
      },
      colors: {
        // Existing brand — kept for backwards compatibility during phase 1
        primary: '#16232A',
        darkBlue: '#16232A',
        orange: '#FF5B04',
        teal: '#075056',
        lightGray: '#E4EEF0',
        accent: '#FF5B04',
        // Revamp tokens — DESIGN.md §1 + REVAMP_PLAN §6.4
        brand: {
          orange: '#f97316',          // Primary CTA — reserved
          'orange-hover': '#ea6a12',
          ink: '#0f172a',             // Deep navy for headings + footer
          canvas: '#f8fafc',          // Main bg, never pure white
          'canvas-2': '#f1f5f9',      // Alternate section bg
          trust: '#10b981',           // Success/trust chips only
          hairline: '#e2e8f0',        // The signature thin gray divider
          'muted-ink': '#475569',     // Kicker + supporting text
        },
        // shadcn tokens (already added earlier)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Revamp shadow tokens — soft on rest, lifted on hover
        'soft-sm': '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
        'soft-md': '0 4px 12px rgba(15,23,42,0.06), 0 2px 4px rgba(15,23,42,0.04)',
        'soft-lg': '0 12px 24px rgba(15,23,42,0.08), 0 4px 8px rgba(15,23,42,0.04)',
        'soft-xl': '0 24px 48px rgba(15,23,42,0.12), 0 8px 16px rgba(15,23,42,0.06)',
        'glow-orange': '0 8px 24px rgba(249,115,22,0.28)',
      },
      transitionDuration: {
        400: '400ms',
      },
      scale: {
        120: '1.2',
      },
      rotate: {
        360: '360deg',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ken-burns': 'kenBurns 16s ease-in-out infinite alternate',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.08) translate(-2%, -1%)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
